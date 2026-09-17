import DoctorApprovalTabs from "@/components/modules/doctor-approval/doctor-approval-tabs";

const ApproveDoctorPage = () => {
  return (
    <section className="p-5">
      <div className="">
        <h1>Doctor Approval</h1>
        <p>Please review and make sure the given information is real.</p>
      </div>

      <DoctorApprovalTabs />
    </section>
  );
};

export default ApproveDoctorPage;
