import { Calendar } from "@acme/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@acme/ui/card";
import { useState } from "react";
import { format } from "date-fns";
import { DatePickerDemo } from "./date-picker";

function TestCalendarPage() {
  const [date, setDate] = useState<string>("2022-01-01");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-2">
        <Calendar
          mode="single"
          selected={date ? new Date(date) : new Date()}
          onSelect={(date) => date && setDate(format(date, "yyyy-MM-dd"))}
        />
        <DatePickerDemo />

        <Calendar mode="range" />
      </CardContent>
    </Card>
  );
}

export default TestCalendarPage;
