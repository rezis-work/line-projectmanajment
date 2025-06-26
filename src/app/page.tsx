import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectValue, SelectTrigger } from "@/components/ui/select";

export default function Home() {
  return (
    <div>
      <Button size={"xs"}>Click me</Button>
      <Button variant={"secondary"}>Secondary</Button>
      <Button variant={"destructive"} size={"lg"}>
        Destructive
      </Button>
      <Button variant={"outline"}>Outline</Button>
      <Button variant={"ghost"}>Ghost</Button>
      <Button variant={"muted"}>Muted</Button>
      <Button variant={"teritary"}>Teritary</Button>
      <Input />
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
      </Select>
    </div>
  );
}
