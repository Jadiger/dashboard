import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ISiteAll } from "../types";
import { Divider, Loader } from "@mantine/core";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import dayjs from "dayjs";
function SiteStatPage() {
  const { id } = useParams();
  // console.log(id);
  const [siteData, setSiteData] = useState<ISiteAll | null>(null);
  const [error, setError] = useState<string | boolean>(false);
  const [isLoading, setIsloading] = useState<boolean>(false);
  console.log(siteData);

  const getData = async () => {
    setIsloading(true);
    try {
      const request = await fetch(`http://localhost:3000/sites/${id}`);
      if (!request.ok) {
        throw new Error("Magliwmat aliwda qatelik");
      }
      const data = await request.json();
      setSiteData(data);
    } catch (err) {
      const error = err as { message: string };
      setError(error.message);
    } finally {
      setIsloading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const statistic = siteData?.statistics
    .sort((a, b) => {
      return (
        new Date(String(a.date)).getTime() - new Date(String(b.date)).getTime()
      );
    })
    .map((item) => ({
      ...item,
      date: dayjs(item.date).format("YYYY-MM-DD"),
    }));
  console.log(statistic);

  if (isLoading) {
    return (
      <div className="w-full h-full  p-4 flex justify-center">
        <Loader size={50} />
      </div>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div>
      <div className="bg-white rounded-md mb-5">
        <h1 className="p-5  font-semibold">Информация о сайте</h1>
        <Divider />
        <div className="p-5 overflow-x-scroll">
          <table className="w-full ">
            <tbody>
              <tr>
                <td className="p-3  rounded-l-md border">Название</td>
                <td className="p-3 border">{siteData?.name}</td>
                <td className="p-3 border">URL</td>
                <td className="p-3 border">{siteData?.url}</td>
                <td className="p-3 border">Описание</td>
                <td className="p-3 border rounded-r-md">
                  {siteData?.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-nowrap gap-3 justify-between bg-white ">
        <div className="w-full md:w-[50%] p-5 border overflow-x-scroll">
          <LineChart width={500} height={300} data={statistic}>
            <Line type="monotone" dataKey={"pageviews"} stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey={"date"} />
            <YAxis />
          </LineChart>
        </div>
        <div className="w-full md:w-[50%] p-5 border"></div>
      </div>
    </div>
  );
}

export default SiteStatPage;
