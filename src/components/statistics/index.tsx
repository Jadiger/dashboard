import { Grid, Loader } from "@mantine/core";

import { useQuery } from "@tanstack/react-query";
import { getSites } from "../../api";

interface IStats {
  title: string;
  value: number;
}

function Statistics() {
  const {
    data: sitesData,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["sites"],
    queryFn: getSites,
    staleTime: 30_000,
  });

  const views = sitesData
    ?.flatMap((site) => site.statistics)
    .map((views) => Number(views.pageviews))
    .reduce((acc, cur) => acc + cur, 0);

  const visits = sitesData
    ?.flatMap((site) => site.statistics)
    .map((views) => Number(views.visits))
    .reduce((a, b) => a + b, 0);

  const stats: IStats[] = [
    {
      title: "Количество сайтов",
      value: sitesData?.length || 0,
    },
    {
      title: "Общее количество визитов",
      value: visits || 0,
    },
    {
      title: "Общее количество просмотров страниц",
      value: views || 0,
    },
    {
      title: "Новых сайтов за последние 7 дней",
      value: Math.floor(Math.random() * 50) || 0,
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error Message : {error.message}</div>;
  }

  return (
    <>
      <Grid gutter={16} style={{ marginBottom: 16 }}>
        {stats.map((stat, index) => (
          <Grid.Col span={{ base: 6, md: 3 }} key={index}>
            <div className="flex flex-col justify-between gap-5 h-full min-h-[120px] border p-5 bg-white rounded-md py-8 relative">
              <div>{stat.title}</div>
              {isLoading ? (
                <div className="flex justify-center">
                  <Loader color="blue" size={40} />
                </div>
              ) : (
                <div className="text-4xl font-semibold">{stat.value}</div>
              )}
            </div>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default Statistics;
