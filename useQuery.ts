// import { useRouter } from "next/navigation";

// export default function useQuery() {
//   const queryParams = new URLSearchParams(window.location.search);
//   const router = useRouter();
//   const pathname = window.location.pathname;

//   function replace(name:string, value:string) {
//     if (queryParams.get(name)!==value) {
//       queryParams.set(name, value);
//       router.replace(`${pathname}?${queryParams.toString()}`);
//     }
//   }
//   function get(name:string) {
//     if(name){
//         return queryParams.get(name)
//     }
//     return queryParams.toString();
//   }
//   function modify(name, value) {
//     queryParams.set(name, value);
//     return queryParams.toString();
//   }

//   return { replace, modify, get };
// }
