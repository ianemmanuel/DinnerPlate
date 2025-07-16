"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel } from "@restaurant-webapp/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@restaurant-webapp/components/ui/select"
import { Switch } from "@restaurant-webapp/components/ui/switch"
import { Input } from "@restaurant-webapp/components/ui/input"
import { Badge } from "@restaurant-webapp/components/ui/badge"
import { Clock, Calendar, AlertCircle } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"

const DAYS_OF_WEEK = [
  { id: "monday", label: "Monday", short: "Mon" },
  { id: "tuesday", label: "Tuesday", short: "Tue" },
  { id: "wednesday", label: "Wednesday", short: "Wed" },
  { id: "thursday", label: "Thursday", short: "Thu" },
  { id: "friday", label: "Friday", short: "Fri" },
  { id: "saturday", label: "Saturday", short: "Sat" },
  { id: "sunday", label: "Sunday", short: "Sun" }
];

interface AvailabilitySectionProps {
  form: UseFormReturn<MealFormData>;
}

export function AvailabilitySection({ form }: AvailabilitySectionProps) {
  const availability = form.watch("availability");
  const preparationTime = form.watch("preparationTime");

  const updateDayAvailability = (day: string, isAvailable: boolean) => {
    const currentSchedule = form.getValues("availability.schedule") || {};
    form.setValue("availability.schedule", {
      ...currentSchedule,
      [day]: {
        ...currentSchedule[day],
        isAvailable
      }
    });
  };

  const updateDayTime = (day: string, timeType: 'startTime' | 'endTime', value: string) => {
    const currentSchedule = form.getValues("availability.schedule") || {};
    form.setValue("availability.schedule", {
      ...currentSchedule,
      [day]: {
        ...currentSchedule[day],
        [timeType]: value
      }
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Availability</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Control when your meal is available for ordering. Set specific hours, limit daily quantities, 
            or make it available all the time.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Availability Type */}
        <FormField
          control={form.control}
          name="availability.type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Availability Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="always">Always Available</SelectItem>
                  <SelectItem value="schedule">Scheduled Hours</SelectItem>
                  <SelectItem value="limited">Limited Quantity</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* Schedule Settings */}
        {availability?.type === "schedule" && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <h4 className="text-sm font-medium">Weekly Schedule</h4>
            </div>
            
            <div className="space-y-3">
              {DAYS_OF_WEEK.map((day) => {
                const daySchedule = availability.schedule?.[day.id];
                return (
                  <div key={day.id} className="border rounded-lg p-3 space-y-3">
                    {/* Day toggle row */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Switch
                          checked={daySchedule?.isAvailable || false}
                          onCheckedChange={(checked) => updateDayAvailability(day.id, checked)}
                        />
                        <span className="text-sm font-medium min-w-[3rem]">{day.short}</span>
                      </div>
                    </div>
                    
                    {/* Time selection row */}
                    {daySchedule?.isAvailable && (
                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
                        <div className="sm:col-span-2">
                          <input
                            type="time"
                            value={daySchedule.startTime || "09:00"}
                            onChange={(e) => updateDayTime(day.id, 'startTime', e.target.value)}
                            className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md cursor-pointer hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring"
                          />
                        </div>
                        
                        <div className="flex justify-center">
                          <span className="text-sm text-muted-foreground">to</span>
                        </div>
                        
                        <div className="sm:col-span-2">
                          <input
                            type="time"
                            value={daySchedule.endTime || "22:00"}
                            onChange={(e) => updateDayTime(day.id, 'endTime', e.target.value)}
                            className="w-full h-10 px-3 py-2 text-sm border border-input bg-background rounded-md cursor-pointer hover:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-ring"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Limited Quantity */}
        {availability?.type === "limited" && (
          <FormField
            control={form.control}
            name="availability.limitedQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Limit</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter daily limit"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}

        {/* Preparation Time */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Preparation Time</h4>
            <Badge variant="outline">
              {preparationTime} minutes
            </Badge>
          </div>
          
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="300"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>Customers will see this estimated preparation time</span>
          </div>
        </div>

        {/* Active Status */}
        <FormField
          control={form.control}
          name="availability.isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start justify-between space-y-0 gap-4">
              <div className="space-y-1">
                <FormLabel>Active Status</FormLabel>
                <p className="text-sm text-muted-foreground">
                  Turn off to temporarily disable this meal
                </p>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}