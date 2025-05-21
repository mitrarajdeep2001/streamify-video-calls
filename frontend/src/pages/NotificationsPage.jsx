import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  acceptFriendRequest,
  getAllNotifications,
  markAllNotificationsAsRead,
} from "../lib/api";
import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
  UserPlus,
} from "lucide-react";
import NoNotificationsFound from "../components/NoNotificationsFound";
import { formatDistanceToNow } from "date-fns";
import { useEffect } from "react";

const NotificationsPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getAllNotifications,
  });

  const markAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["unreadNotificationsCount"] });
    },
  });

  const acceptRequestMutation = useMutation({
    mutationFn: (senderId) => acceptFriendRequest(senderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleAccept = (senderId) => {
    acceptRequestMutation.mutate(senderId);
  };

  useEffect(() => {
    markAsReadMutation.mutate();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : data.notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : (
          <ul className="space-y-4">
            {data.notifications.map((notif) => (
              <li
                key={notif._id}
                className={`flex items-start gap-4 p-4 rounded-xl shadow-sm border ${
                  notif.isRead ? "bg-base-100" : "bg-primary/5 border-primary"
                }`}
              >
                <div className="pt-1">
                  {notif.type === "friend_request" ? (
                    <UserCheckIcon className="w-5 h-5 text-primary" />
                  ) : notif.type === "message" ? (
                    <MessageSquareIcon className="w-5 h-5 text-secondary" />
                  ) : (
                    <BellIcon className="w-5 h-5 text-info" />
                  )}
                </div>

                <div className="flex-1">
                  <p className="text-sm text-base-content">{notif.message}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {formatDistanceToNow(new Date(notif.createdAt), {
                      addSuffix: true,
                    })}
                  </p>
                </div>

                {/* Accept Button for Friend Request */}
                {notif.type === "friend_request" && (
                  <button
                    onClick={() => handleAccept(notif.sender._id)}
                    className="btn btn-sm btn-primary"
                    disabled={
                      acceptRequestMutation.isPending || notif.actionTaken
                    }
                  >
                    {acceptRequestMutation.isPending ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : !notif.actionTaken ? (
                      <UserPlus />
                    ) : (
                      <UserCheckIcon />
                    )}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
