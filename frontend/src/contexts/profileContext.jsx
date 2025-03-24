import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { commoncontext } from "./commoncontext";

export const profileContext = createContext();
const transformData = (activity) => {
  if (!activity || !Array.isArray(activity)) return [];

  const activityMap = {};
  activity.forEach(({date}) => {
    const formattedDate = new Date(date).toISOString().split("T")[0];
    activityMap[formattedDate] = (activityMap[formattedDate] || 0) + 1;
  });

  return Object.keys(activityMap).map((date) => ({
    date,
    count: activityMap[date],
  }));
};

const ProfileProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { token, setUser, user } = useContext(commoncontext);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (token){
        try {
          const response = await axios.get(`${backendUrl}/api/auth/user`, {
            headers: {
              token: token,
              email: user.email,
            },
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            console.error("Failed to fetch user profile:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [token, backendUrl, setUser]);

  useEffect(() => {
    if (user) {
      const DailyActivityMap = transformData(user.dailyActivity);
      DailyActivityMap.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA - dateB;
      });

      let MaxScore = 0;
      let MinScore = 10000000000000;
      let HoursPlayed = 23;

      user.ratingHistory.forEach(({ score }) => {
        MaxScore = Math.max(MaxScore, score);
        MinScore = Math.min(MinScore, score);
      });

      const FirstGameDate = DailyActivityMap.length > 0 ? DailyActivityMap[0].date : null;
      const LastGameDate = DailyActivityMap.length > 0 ? DailyActivityMap[DailyActivityMap.length - 1].date : null;

      const newProfile = {
        username: user.username,
        email: user.email,
        profilePicture: user.profilePicture,
        isVerified: user.isVerified,
        score: user.score,
        gamesPlayed: user.gamesPlayed,
        gamesWon: user.gamesWon,
        gamesLost: user.gamesLost,
        gamesDrawn: user.gamesDrawn,
        gamesResigned: user.gamesResigned,
        gameHistory: user.gameHistory,
        LastGameID: "This will be done later",
        DailyActivityMap: DailyActivityMap,
        longestStreak: user.longestStreak,
        currentStreak: user.currentStreak,
        ratingHistory: user.ratingHistory,
        MaxScore: MaxScore,
        MinScore: MinScore,
        HoursPlayed: HoursPlayed,
        FirstGamePlayDate: FirstGameDate,
        LastGamePlayDate: LastGameDate,
      };

      setUserProfile(newProfile);
      console.log(userProfile);
    }
  }, [user]);

  const value = {
    backendUrl,
    userProfile,
    loading,
  };

  return (
    <profileContext.Provider value={value}>
      {props.children}
    </profileContext.Provider>
  );
};

export default ProfileProvider;