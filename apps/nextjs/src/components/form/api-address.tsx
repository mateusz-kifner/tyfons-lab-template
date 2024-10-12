// import DisplayCellExpanding from "@acme/ui/DisplayCellExpanding";
// import { Label } from "@acme/ui/label";
// import type LiveFormInput from "./live-form";
// import type { Address } from "@/server/api/address/validator";
// import LiveFormEnum from "@acme/live-form/enum";
// import LiveForm, {
//   type Key,
//   useLiveFormContext,
// } from "@acme/live-form/live-form";
// import LiveFormText from "@acme/live-form/text";
// import { cn } from "@acme/ui";
// import useTranslation from "@/hooks/useTranslation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@acme/ui/dialog";
// import { type Dispatch, type SetStateAction, useState } from "react";
// import { useClickOutside } from "@mantine/hooks";
// import { useLoaded } from "@/hooks/useLoaded";
// import api from "@/hooks/api";
// import { getQueryKey } from "@trpc/react-query";
// import { trpc } from "@/utils/trpc";
// import { useQueryClient } from "@tanstack/react-query";
// import { addressToString } from "@acme/live-form/utils";
// import { useFlag } from "@/hooks/useFlag";

// export const provinces = [
//   "dolnośląskie",
//   "kujawsko-pomorskie",
//   "lubelskie",
//   "lubuskie",
//   "łódzkie",
//   "małopolskie",
//   "mazowieckie",
//   "opolskie",
//   "podkarpackie",
//   "podlaskie",
//   "pomorskie",
//   "śląskie",
//   "świętokrzyskie",
//   "warmińsko-mazurskie",
//   "wielkopolskie",
//   "zachodniopomorskie",
// ];

// interface LiveFormAddressProps extends LiveFormInput<number> {
//   maxLength?: number;
// }

// function LiveFormAddressContent(props: {
//   enumOpen?: boolean;
//   setEnumOpen?: Dispatch<SetStateAction<boolean>>;
// }) {
//   const { enumOpen, setEnumOpen } = props;
//   const t = useTranslation();

//   return (
//     <div className="flex flex-grow flex-col gap-2 pb-3">
//       <LiveFormText
//         label={t.streetName}
//         keyName="streetName"
//         className="text-stone-800 dark:text-stone-200"
//       />
//       <div className="flex flex-grow gap-2">
//         <LiveFormText
//           label={t.streetNumber}
//           keyName="streetNumber"
//           className="text-stone-800 dark:text-stone-200"
//         />
//         <LiveFormText
//           label={t.apartmentNumber}
//           keyName="apartmentNumber"
//           className="text-stone-800 dark:text-stone-200"
//         />
//       </div>
//       <LiveFormText
//         label={t.secondLine}
//         keyName="secondLine"
//         className="text-stone-800 dark:text-stone-200"
//       />
//       <LiveFormText
//         label={t.postCode}
//         keyName="postCode"
//         className="text-stone-800 dark:text-stone-200"
//       />
//       <LiveFormText
//         label={t.city}
//         keyName="city"
//         className="text-stone-800 dark:text-stone-200"
//       />
//       <div className="flex flex-grow flex-col">
//         <Label label={t.province} />
//         <LiveFormEnum
//           keyName="province"
//           enum_data={provinces}
//           open={enumOpen}
//           onOpenChange={setEnumOpen}
//         />
//       </div>
//     </div>
//   );
// }

// function LiveFormAddressExtend(props: LiveFormInput<Address>) {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     // maxLength,
//     leftSection,
//     rightSection,
//     keyName,
//   } = props;
//   const [focus, setFocus] = useState<boolean>(false);
//   const [enumOpen, setEnumOpen] = useState<boolean>(false);

//   const onFocus = () => !disabled && setFocus(true);
//   const onBlur = () => !enumOpen && setFocus(false);
//   const ref = useClickOutside(onBlur);

//   const valueString = addressToString(value);
//   return (
//     <div className="flex-grow">
//       <Label label={label} copyValue={valueString} required={required} />
//       <DisplayCellExpanding
//         className={cn(
//           "h-auto px-2 py-2 focus-within:ring-0",
//           !valueString
//             ? "text-gray-400 dark:text-stone-600"
//             : "text-stone-950 dark:text-stone-200",
//           focus && "bg-transparent",
//         )}
//         ref={ref}
//         onClick={onFocus}
//         onFocus={onFocus}
//         disabled={disabled}
//         leftSection={!(focus || enumOpen) && leftSection}
//         rightSection={rightSection}
//         focus={focus}
//       >
//         {focus ? (
//           <LiveFormAddressContent
//             enumOpen={enumOpen}
//             setEnumOpen={setEnumOpen}
//           />
//         ) : (
//           valueString || "_____ __/__\n_____\n__-___ _____\n_____"
//         )}
//       </DisplayCellExpanding>
//     </div>
//   );
// }

// function LiveFormAddressAlwaysVisible(props: LiveFormInput<Address>) {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     // maxLength,
//     leftSection,
//     rightSection,
//     keyName,
//   } = props;
//   const valueString = addressToString(value);
//   return (
//     <div className="flex-grow">
//       <Label label={label} copyValue={valueString} required={required} />
//       <DisplayCellExpanding
//         className={cn(
//           "h-auto bg-transparent px-2 py-2 focus-within:ring-0",
//           !valueString
//             ? "text-gray-400 dark:text-stone-600"
//             : "text-stone-950 dark:text-stone-200",
//         )}
//         disabled={disabled}
//         leftSection={!focus && leftSection}
//         rightSection={rightSection}
//       >
//         <LiveFormAddressContent />
//       </DisplayCellExpanding>
//     </div>
//   );
// }

// interface LiveFormAddress2Props extends LiveFormInput<Address> {
//   maxLength?: number;
// }

// const LiveFormAddressPopover = (props: LiveFormAddress2Props) => {
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     // maxLength,
//     leftSection,
//     rightSection,
//     keyName,
//   } = props;

//   const valueString = addressToString(value);

//   return (
//     <div className="flex flex-grow flex-col">
//       <Label label={label} copyValue={valueString} required={required} />
//       <Dialog>
//         <DialogTrigger>
//           <DisplayCellExpanding
//             className={cn(
//               "h-auto px-2 py-2 text-left focus-within:ring-0",
//               !valueString
//                 ? "text-gray-400 dark:text-stone-600"
//                 : "text-stone-950 dark:text-stone-200",
//             )}
//             disabled={disabled}
//             leftSection={leftSection}
//             rightSection={rightSection}
//           >
//             {valueString ?? "⸺"}
//           </DisplayCellExpanding>
//         </DialogTrigger>

//         <DialogContent>
//           {props.label !== undefined && (
//             <DialogHeader>
//               <DialogTitle>{props.label}</DialogTitle>
//             </DialogHeader>
//           )}
//           <LiveFormAddressContent />
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// const LiveFormAddress = (props: LiveFormAddressProps) => {
//   const { flags } = useFlag("root");
//   const {
//     label,
//     value,
//     onSubmit,
//     disabled,
//     required,
//     // maxLength,
//     leftSection,
//     rightSection,
//     keyName,
//   } = useLiveFormContext(props);
//   const isLoaded = useLoaded();
//   const queryClient = useQueryClient();
//   const { data, refetch } = api.address.useGetById(value ?? null);
//   const addressGetByIdKey = getQueryKey(
//     trpc.address.getById,
//     value as number,
//     "query",
//   );
//   const { mutateAsync: update } = api.address.useUpdate({
//     onSuccess: (data) => {
//       queryClient.setQueryData(addressGetByIdKey, data);
//     },
//   });

//   const apiUpdate = (key: Key, val: any) => {
//     if (!isLoaded) return;
//     if (!data) return;

//     update({ id: data.id, [key]: val }).catch(console.log);
//   };

//   const valueString = addressToString(data);

//   if (data === undefined) {
//     return (
//       <div className="flex flex-grow flex-col">
//         <Label label={label} required={required} />

//         <DisplayCellExpanding
//           className={cn(
//             "h-auto px-2 py-2 text-left focus-within:ring-0",
//             "text-gray-400 dark:text-stone-600",
//           )}
//           disabled={disabled}
//           leftSection={leftSection}
//           rightSection={rightSection}
//         >
//           _____ __/__
//           <br />
//           _____
//           <br />
//           __-___ ____
//           <br />
//           _____
//         </DisplayCellExpanding>
//       </div>
//     );
//   }

//   let ModeElement = LiveFormAddressPopover;
//   if (flags?.LiveForm_address_mode === "always_visible")
//     ModeElement = LiveFormAddressAlwaysVisible;
//   if (flags?.LiveForm_address_mode === "extend")
//     ModeElement = LiveFormAddressExtend;

//   return (
//     <LiveForm onSubmit={apiUpdate} data={data}>
//       <ModeElement label={label} value={data} />
//     </LiveForm>
//   );
// };

// export default LiveFormAddress;
