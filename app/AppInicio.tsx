import { Button } from "@/components/ui/button";
import { Table } from "lucide-react";

export const AppInicio = () => {
  return (
    <div>
      <Button size={"lg"} href="/conversiones">
        <Table /> Conversión de archivos
      </Button>
    </div>
  );
};
