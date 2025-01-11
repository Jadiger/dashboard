import { Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Form, { SitesBody } from "./form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSite } from "../../api";

function AddSite() {
  const [opened, { open, close }] = useDisclosure(false);
  const queryCLient = useQueryClient();
  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationFn: createSite,
    onSuccess: (data) => {
      // queryCLient.invalidateQueries({ queryKey: ["sites"] });

      queryCLient.setQueryData(["sites"], (oldData: SitesBody[]) => [
        ...oldData,
        data,
      ]);
    },
  });
  const submitFunc = async (data: SitesBody) => {
    await mutateAsync(data);
  };

  if (isError) {
    return <div>Error Message : {error.message}</div>;
  }

  return (
    <>
      <Drawer
        position="right"
        opened={opened}
        onClose={close}
        title={"Добавление нового сайта"}
      >
        <Form close={close} submitFunc={submitFunc} loading={isPending} />
      </Drawer>

      <Button variant="gradient" onClick={open}>
        + Добавитъ
      </Button>
    </>
  );
}

export default AddSite;
