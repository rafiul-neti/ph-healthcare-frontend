
import DoctorScheduleTabs from "@/components/modules/doctor-schedule/doctor-schedule-tabs";

const DoctorSchedulePage = () => {
  return (
    <section className="p-5">
      <div className="">
        <h1 className="text-2xl">My Schedules</h1>
        <p>Create schedules, publish them for booking, or delete drafts.</p>
      </div>

      <DoctorScheduleTabs />
    </section>
  );
};

export default DoctorSchedulePage;

