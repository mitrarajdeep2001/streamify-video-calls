import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CustomChannelHeader = () => {
  const navigate = useNavigate();
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const members = Object.values(channel.state.members || {});
  const otherMember = members.find((m) => m.user?.id !== client.userID);
  console.log(otherMember?.user.online);

  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-secondary bg-primary">
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 cursor-pointer z-50 relative"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Profile image */}
      <img
        src={otherMember?.user?.image || ""}
        alt={otherMember?.user?.name}
        className="w-9 h-9 rounded-full object-cover"
      />

      {/* Name */}
      <div className="flex flex-col">
        <p className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          {otherMember?.user?.name}
        </p>
        {/* Online status */}
        <span className="text-xs text-zinc-500">
          {otherMember?.user?.online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
};

export default CustomChannelHeader;
