import { Pagination } from "@acme/ui/pagination";

function TestPagination() {
  return (
    <>
      <Pagination initialPage={1} totalPages={10} onPageChange={() => {}} />
      <Pagination initialPage={1} totalPages={40} onPageChange={() => {}} />
      <Pagination
        initialPage={1}
        totalPages={40}
        onPageChange={() => {}}
        siblings={1}
      />
    </>
  );
}

export default TestPagination;
