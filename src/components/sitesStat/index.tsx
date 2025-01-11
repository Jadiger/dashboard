import AddSite from "./AddSite";
import { Divider } from "@mantine/core";
import SitesCrud from "./SitesCrud";

import { useQuery } from "@tanstack/react-query";
import { getSites } from "../../api";

function SitesStat() {
  const title = ["ID", "Название", "URL", "Описание", "Действия"];

  const {
    data: sites,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["sites"],
    queryFn: getSites,
    staleTime: 30_000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error mesage : {error.message}</div>;
  }

  return (
    <div className="bg-white rounded-md">
      <div className="flex justify-between p-5 ">
        <h1>Sites</h1>
        <AddSite />
      </div>
      <Divider />
      <div className="p-5 overflow-x-scroll">
        <table className="w-full">
          <thead>
            <tr>
              {title.map((item, index) => (
                <th key={index} className="border p-3 text-left">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sites?.map((site, index) => (
              <tr key={site.id}>
                <td className="border p-3 text-left">{index + 1}</td>
                <td className="border p-3 text-left">{site.name}</td>
                <td className="border p-3 text-left">{site.url}</td>
                <td className="border p-3 text-left">{site.description}</td>
                <td className="border p-3 text-left">
                  <SitesCrud id={site.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SitesStat;
