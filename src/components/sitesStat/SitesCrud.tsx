import { Button } from "@mantine/core";

import { notifications } from "@mantine/notifications";
import { FiBarChart2, FiTrash2 } from "react-icons/fi";
import EditSite from "./EditSite";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSite } from "../../api";
function SitesCrud({ id}: { id: string;}) {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const queryKey = useQueryClient()
  const {mutateAsync,isPending,error} = useMutation({
      mutationFn : deleteSite,
      onSuccess : ()=> {
        notifications.show({
          message: `Сайт успешно удален`,
          position: "top-right",
        });
        queryKey.invalidateQueries({queryKey : ['sites']})
      },
      onError : ()=> {
          notifications.show({
            message: error?.message,
            position: "top-right",
          });
      }
  })
  

  return (
    <div className="flex gap-2">
      <Link to={`/sites/${id}`}>
        <Button>
          <FiBarChart2 />
        </Button>
      </Link>

      <EditSite id={id} />

      <Button
        onClick={async ()=> {
          await mutateAsync(id)
        }}
        loading={isPending ? true : false}
        color="red"
      >
        <FiTrash2 />
      </Button>
    </div>
  );
}

export default SitesCrud;
