"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useGetMyAppointments } from "@/hooks";

export default function AppointmentList() {
  const params = useSearchParams();
  const status = params.get("status");

  const { data } = useGetMyAppointments({ page: 1, limit: 100 });

  const appointments = data?.data || [];

  if (status === "failure") {
    return (
      <div className="">
        <div className="">
          <h1>Payment Failed</h1>
          <p>Please check your vendor</p>
          <Link href={`/patient/my-appointments`}>Go back to appointments</Link>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="">
        <div className="">
          <h1>Payment Successful</h1>
          <p>Please be prepared to join the call</p>
          <Link href={`/patient/my-appointments`}>Go back to appointments</Link>
        </div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return <p>There is no appointment(s)</p>;
  }

  return (
    <div>
      {appointments.map(({ id, doctorId, status }) => (
        <div key={id} className="border rounded-স্ p-3">
          <div className="w-full flex gap-3">
            <span> Doctor: {doctorId} </span>
            <span> Status: {status} </span>
            <div className="ml-auto">
              <Button>Join</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
