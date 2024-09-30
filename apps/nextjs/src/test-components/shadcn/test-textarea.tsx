import { Label } from "@acme/ui/label";
import { Textarea } from "@acme/ui/textarea";

function TestTextarea() {
  return (
    <>
      <Textarea placeholder="Type your message here." />
      <Textarea placeholder="Type your message here." disabled />
      <div className="grid w-full gap-1.5">
        <Label label="Your Message" htmlFor="message-2" />
        <Textarea placeholder="Type your message here." id="message-2" />
        <p className="text-muted-foreground text-sm">
          Your message will be copied to the support team.
        </p>
      </div>
    </>
  );
}

export default TestTextarea;
