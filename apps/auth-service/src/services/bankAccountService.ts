import prisma from "@packages/libs/prisma"
import { encrypt } from '../utils/bank/encryption'

interface CreateBankAccountInput {
  vendorId: string
  bankName: string
  branchName: string
  bankCode: string
  accountNumber: string
  accountName: string
  swiftCode?: string
}

export async function createVendorBankAccount(input: CreateBankAccountInput) {
  // Encrypt sensitive fields
  const encryptedAccountNumber = encrypt(input.accountNumber)
  const encryptedAccountName = encrypt(input.accountName)

  // Create bank account
  const bankAccount = await prisma.vendorBankAccount.create({
    data: {
      vendorId: input.vendorId,
      bankName: input.bankName,
      branchName: input.branchName,
      bankCode: input.bankCode,
      accountNumber: encryptedAccountNumber,
      accountName: encryptedAccountName,
      swiftCode: input.swiftCode,
    },
  })

  //* Update vendor flag
  await prisma.vendor.update({
    where: { id: input.vendorId },
    data: {
      hasLinkedBankAccount: true,
    },
  })

  return bankAccount
}

export async function updateVendorBankAccount(
  vendorId: string,
  updateData: Partial<CreateBankAccountInput>
) {
  //* If updating account number or account name, encrypt them
  const dataToUpdate: any = { ...updateData }

  if (updateData.accountNumber) {
    dataToUpdate.accountNumber = encrypt(updateData.accountNumber)
  }
  if (updateData.accountName) {
    dataToUpdate.accountName = encrypt(updateData.accountName)
  }

  const updated = await prisma.vendorBankAccount.updateMany({
    where: { vendorId },
    data: dataToUpdate,
  })

  return updated
}
