
import { NextRequest, NextResponse } from 'next/server'
import { bankAccountSchema } from '@restaurant-webapp/lib/validators/bank-validators'
import { API_ENDPOINTS } from '@restaurant-webapp/lib/endpoints'
import { ZodError } from 'zod'

export async function POST(request: NextRequest) {
  //* Authenticate the request
  const authToken = request.headers.get('Authorization')
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized - Missing or invalid token' },
      { status: 401 }
    )
  }

    //* 2. Validate input data

    let submissionData
    try {
        const body = await request.json()
        submissionData = bankAccountSchema.parse(body)
    } catch (validationError) {
    if (validationError instanceof ZodError) {
        return NextResponse.json(
        { 
            error: 'Validation failed',
            details: validationError.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
            }))
        },
        { status: 400 }
        )
    }
    return NextResponse.json(
        { error: 'Unexpected error during validation' },
        { status: 500 }
    )
    }

    //* 3. Prepare Express API request
    const expressUrl = API_ENDPOINTS.BANKS.LINK_BANK_ACCOUNT
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken // Forward the auth token
        },
        credentials: 'include' as const,
        body: JSON.stringify(submissionData),
        signal: AbortSignal.timeout(8000) // 8-second timeout
    }

    //* 4. Submit to Express backend with retry logic
    try {
    const response = await fetchWithRetry(expressUrl, requestOptions)

    // Check status before parsing JSON
    let data
    if (response.headers.get('content-type')?.includes('application/json')) {
        data = await response.json()
    } else {
        const text = await response.text()
        throw new Error(text || 'Express API returned an unexpected non-JSON error')
    }

    if (!response.ok) {
        throw new Error(data?.message || 'Express API request failed')
    }

    return NextResponse.json(data)

    } catch (error: any) {
    console.error('Bank submission failed:', error)

    return NextResponse.json(
        { 
        error: 'Failed to process bank details',
        message: error.message,
        retryable: isRetryableError(error)
        },
        { status: 500 }
    )
    }
}

// Helper function with retry mechanism
async function fetchWithRetry(url: string, options: RequestInit, retries = 2) {
    try {
        const response = await fetch(url, options)
        if (response.status === 429 && retries > 0) { // Rate limited
            await new Promise(resolve => setTimeout(resolve, 1000 * (3 - retries)))
            return fetchWithRetry(url, options, retries - 1)
        }
        return response
    } catch (error) {
        if (isRetryableError(error) && retries > 0) {
            await new Promise(resolve => setTimeout(resolve, 1000))
            return fetchWithRetry(url, options, retries - 1)
        }
        throw error
    }
}

function isRetryableError(error: any) {
  return [
    'ECONNRESET', 
    'ETIMEDOUT', 
    'ENOTFOUND',
    'ECONNREFUSED'
  ].some(code => error.code?.includes(code))
}