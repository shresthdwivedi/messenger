import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/layout/Body";
import EmptyState from "@/components/layout/EmptyState";
import Form from "@/components/layout/Form";
import Header from "@/components/layout/Header";

interface Params {
  conversationId: string,
}

const ConversationId = async ({ params }: { params: Params }) => {
  const { conversationId } = await params; 
  const conversation = await getConversationById(conversationId);
  const messages = await getMessages(conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="flex flex-col h-full">
          <EmptyState />
        </div>
      </div>
    )
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="flex flex-col p-4 h-full w-full bg-neutral-200 dark:bg-black items-center">
        <Header conversation={conversation} />
        <Body initialMessages={messages}/>
        <Form />
      </div>
    </div>
  )
}

export default ConversationId;