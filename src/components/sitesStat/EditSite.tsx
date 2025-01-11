import { Alert, Button, Center, Drawer, Loader } from "@mantine/core";
import Form, { SitesBody } from "./form";

import dayjs from "dayjs";
import { useDisclosure } from "@mantine/hooks";
import { FiEdit2 } from "react-icons/fi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editSite, getSite } from "../../api";

function EditSite({ id }: { id: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const {
    data: editSiteData,
    isLoading: isDataLoading,
    isError: error,
  } = useQuery({
    queryKey: ["site", id],
    queryFn: () => getSite(id),
    enabled: opened,
    staleTime: 30_000,
  });

  const { mutateAsync, isPending } = useMutation<
    unknown,
    { message: string },
    {
      id: string;
      body: SitesBody;
    }
  >({
    mutationFn: editSite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sites"] });
    },
    onError: (err) => err.message,
  });

  const submitFunc = async (data: SitesBody) => {
    await mutateAsync({ id, body: data }).catch((err) => Promise.reject(err));
  };

  return (
    <>
      {opened && (
        <Drawer
          position="right"
          opened={opened}
          onClose={close}
          title={"Edit Site"}
        >
          {error && (
            <Alert variant="light" color="red" title="Error">
              {error}
            </Alert>
          )}
          {isDataLoading && (
            <Center>
              <Loader />
            </Center>
          )}

          {isDataLoading || (
            <Form
              close={close}
              submitFunc={submitFunc}
              loading={isPending}
              initialValues={{
                description: editSiteData?.description ?? "",
                name: editSiteData?.name ?? "",
                url: editSiteData?.url ?? "",
                statistics:
                  editSiteData?.statistics.map((stat) => ({
                    ...stat,
                    date: dayjs(stat.date).toDate(),
                  })) ?? [],
              }}
            />
          )}
        </Drawer>
      )}

      <Button onClick={open}>
        <FiEdit2 />
      </Button>
    </>
  );
}

export default EditSite;
