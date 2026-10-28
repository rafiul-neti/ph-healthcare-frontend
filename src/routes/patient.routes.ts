const prefix = "/patient";

export const patientRoutes = [
  {
    title: "Schedule",
    items: [
      {
        title: "Overview",
        url: `${prefix}`,
      },
      {
        title: "My Appointments",
        url: `${prefix}/my-appointments`,
      },
    ],
  },
];
