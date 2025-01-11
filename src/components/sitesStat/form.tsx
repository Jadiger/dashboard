import { useForm, hasLength, matches } from "@mantine/form";
import {
  Button,
  Group,
  TextInput,
  Box,
  Grid,
  Textarea,
  Stack,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { notifications } from "@mantine/notifications";

export interface SitesBody {
  name: string;
  url: string;
  description: string;
  statistics: {
    date: Date | null;
    visits: string;
    pageviews: string;
  }[];
}

export default function Form({
  close,
  initialValues = {
    name: "",
    url: "",
    description: "",
    statistics: [
      {
        date: null,
        visits: "",
        pageviews: "",
      },
    ],
  },
  submitFunc,
  loading,
}: {
  close: () => void;
  initialValues?: SitesBody;
  submitFunc: (data: SitesBody) => Promise<unknown>;
  loading: boolean;
}) {
  const form = useForm<SitesBody>({
    mode: "uncontrolled",
    initialValues,
    validate: {
      name: hasLength({ min: 2, max: 10 }, "Name must be 2-10 characters long"),
      url: matches(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-]*)*$/, "Error Url"),
    },
  });

  const hanleSubmit = async (data: typeof form.values) => {
    try {
      await submitFunc(data).then(() => {
        form.reset();
        notifications.show({
          message: `Сайт успешно создан`,
          position: "top-right",
        });
        close();
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fields = form.getValues().statistics.map((_, index) => (
    <Group
      style={{ width: "100%" }}
      key={index}
      mt="xs"
      className="flex flex-nowrap justify-between  mb-2"
    >
      <DateInput
        valueFormat="YYYY-MM-DD"
        label="Дата"
        placeholder="Date"
        maxDate={new Date()}
        key={form.key(`statisctics.${index}.date`)}
        {...form.getInputProps(`statistics.${index}.date`)}
      />
      <TextInput
        type="number"
        label="Посещения"
        placeholder="Visits"
        key={form.key(`statistics.${index}.visits`)}
        {...form.getInputProps(`statistics.${index}.visits`)}
      />
      <TextInput
        label="Просмотры"
        type="number"
        placeholder="Views"
        key={form.key(`statisctics.${index}.pageviews`)}
        {...form.getInputProps(`statistics.${index}.pageviews`)}
      />
    </Group>
  ));

  return (
    <Stack>
      <form onSubmit={form.onSubmit(hanleSubmit)}>
        <Box maw={400} mx="auto">
          <Grid grow>
            <Grid.Col span={6}>
              <TextInput
                label="Название"
                placeholder="Название"
                withAsterisk
                {...form.getInputProps("name")}
                key={form.key("name")}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="URL"
                placeholder="URL"
                withAsterisk
                {...form.getInputProps("url")}
                key={form.key("url")}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Описание"
                placeholder="Описание"
                withAsterisk
                {...form.getInputProps("description")}
                key={form.key("description")}
              />
            </Grid.Col>
            <Grid.Col span={12}>{fields}</Grid.Col>
          </Grid>

          <Group justify="center" mt="md">
            <Button
              onClick={() =>
                form.insertListItem("statistics", {
                  date: null,
                  visits: "",
                  pageviews: "",
                })
              }
            >
              Add employee
            </Button>
          </Group>

          <Group justify="flex-end" mt="md">
            <Button loading={loading} type="submit">
              Submit
            </Button>
          </Group>
        </Box>
      </form>
    </Stack>
  );
}
