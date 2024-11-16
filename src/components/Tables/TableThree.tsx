import { useEffect, useState } from "react";

const TableThree = () => {
  const [leads, setLeads] = useState([]);

  // Fetch leads data from API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch("https://elitetaxation-backend.vercel.app/api/lead/getLeads");
        const data = await response.json();
        setLeads(data.Leads);
      } catch (error) {
        console.error("Error fetching leads:", error);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Query
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {leads?.map((lead, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{lead.user_name}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.user_email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.user_phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{lead.user_query}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      lead.status_id === 1
                        ? "bg-success text-success"
                        : lead.status_id === 2
                        ? "bg-danger text-danger"
                        : "bg-warning text-warning"
                    }`}
                  >
                    {lead.status_id === 1 ? "Active" : lead.status_id === 2 ? "Inactive" : "Pending"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {/* Add your action buttons here */}
                    <button className="hover:text-primary">View</button>
                    <button className="hover:text-primary">Edit</button>
                    <button className="hover:text-primary">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableThree;
