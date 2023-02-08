import { ClientBlog } from "./clientBlog";
import { ClientFooter } from "./clientFooter";
import { ClientHeader } from "./clientHeader";

export function Client() {
  return (
    <>
      <ClientHeader />
      <ClientBlog />
      <ClientFooter />
    </>
  );
}
