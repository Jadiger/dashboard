import { ISiteAll } from "../types";
import { axiosInstance } from "../constatnts/axiosIntance";
import { SitesBody } from "../components/sitesStat/form";

export const getSites = async () => {
  const data = await axiosInstance.get<ISiteAll[]>("/sites");
  return data.data;
};

export const getSite = async (id: string) => {
  const { data } = await axiosInstance.get<ISiteAll>(`/sites/${id}`);
  return data;
};

export const createSite = async (body: SitesBody) => {
  const { data } = await axiosInstance.post(`/sites`, body);
  return data;
};

export const editSite = async ({
  id,
  body,
}: {
  id: string;
  body: SitesBody;
}) => {
  const { data } = await axiosInstance.put(`/sites/${id}`, body);
  return data;
};

export const deleteSite = async (id: string) => {
  const { data } = await axiosInstance.delete(`/sites/${id}`);
  return data;
};
