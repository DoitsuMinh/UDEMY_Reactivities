import { Message } from "semantic-ui-react";

interface Props {
  error: string[];
}

export function ValidationError({ error }: Props) {
  return (
    <Message error>
      {error && (
        <Message.List>
          {error.map((err: string, i) => (
            <Message.Item key={i}>{err}</Message.Item>
          ))}
        </Message.List>
      )}
    </Message>
  );
}
