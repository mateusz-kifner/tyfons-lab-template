// import { type ReactNode, useId } from "react";
// import LiveForm, { useLiveFormContextWithoutOverride } from "./LiveForm";
// import { Label } from "@acme/ui/label";

// interface LiveFormObjectProps {
//   children: ReactNode;
//   data?: Record<string | number, any>;
//   onSubmit?: (key: string | number, value: any) => void;
//   keyName?: string | number;
//   className?: string;
//   label?: string;
// }

// function LiveFormObject(props: LiveFormObjectProps) {
//   const { children, keyName, className, label } = props;
//   if (keyName === undefined) throw new Error("keyName not defined");
//   const context = useLiveFormContextWithoutOverride();
//   const uuid = useId();
//   const data = props?.data?.[keyName] ?? context.data?.[keyName] ?? {};
//   const superOnSubmit = props.onSubmit ?? context.onSubmit;
//   const onSubmit = (key: string | number, value: any) => {
//     if (typeof key === "number")
//       throw new Error("LiveFormObject received number key");
//     const newData = { ...data };
//     newData[key] = value;
//     superOnSubmit?.(keyName, newData);
//     console.log("ObjSET: ", key, value);
//   };

//   return (
//     <>
//       <Label label={label} />
//       <LiveForm onSubmit={onSubmit} data={data}>
//         {children}
//       </LiveForm>
//     </>
//   );
// }

// export default LiveFormObject;
