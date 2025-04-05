"use client";
import {
  getAllAccounts,
  getByIdAccounts,
} from "~/server/service /tincaster.service";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { X, Heart, RefreshCw } from "lucide-react";
import Image from "next/image";
import { sdk } from "@farcaster/frame-sdk";
import { usePrivy } from "@privy-io/react-auth";
import { useFollow } from "~/hooks/use-follow";
import { toast } from "sonner";

interface Account {
  id: number;
  name: string;
  createdAt: Date;
  description: string | null;
  url: string | null;
  fib: number;
}

export default function HomePage() {
  const privy = usePrivy();

  useEffect(() => {
    const ready = async () => {
      await sdk.actions.ready();
    };
    ready()
      .then(() => {
        console.log("Data");
      })
      .catch();
  }, []);

  const getAllAccountsHandler = async () => {
    const res = await getAllAccounts();
    console.log(res);
    return res;
  };
  const getAccountByIdHandler = async (id: number) => {
    const res = await getByIdAccounts(id);
    console.log(res);
    return res;
  };

  const [profiles, setProfiles] = useState<Account[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllAccountsHandler();
      setProfiles(res);
    };

    fetchData();
  }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [allProfilesViewed, setAllProfilesViewed] = useState<boolean>(false);

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setAllProfilesViewed(true);
    }
  };

  const handleLike = async () => {
    if (follow.mutation.isPending) {
      return;
    }

    if (currentIndex < profiles.length - 1) {
      const fid = profiles[currentIndex]?.fib;

      if (!fid) {
        return;
      }

      const message = follow.handleFollow({
        fid: BigInt(fid),
      });

      toast.promise(message, {
        loading: "Loading",
        success: () => <div className="">Success</div>,
      });
      await message;

      setCurrentIndex(currentIndex + 1);
    } else {
      setAllProfilesViewed(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setAllProfilesViewed(false);
  };

  const follow = useFollow();

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4">
      <h1 className="mb-6 text-2xl font-bold">Profile Matcher</h1>

      {!privy.authenticated ? (
        <Button onClick={privy.login} className="mb-6" variant="outline">
          Connect Wallet
        </Button>
      ) : (
        <Button onClick={privy.logout} className="mb-6" variant="outline">
          Disconnect Wallet ({privy.user?.wallet?.address?.slice(0, 6)}...
          {privy.user?.wallet?.address?.slice(-4)})
        </Button>
      )}

      <div className="w-full max-w-md">
        {!allProfilesViewed && currentIndex < profiles.length ? (
          <Card className="w-full">
            <CardHeader className="flex flex-col items-center pt-6">
              <div className="relative mb-4 h-32 w-32">
                <div className="absolute inset-0 overflow-hidden rounded-full border-4 border-gray-100">
                  <Image
                    src={profiles[currentIndex].image || "/placeholder.svg"}
                    alt={`${profiles[currentIndex].name}'s profile picture`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold">
                  {profiles[currentIndex].name}
                </h2>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600">
                {profiles[currentIndex].description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center gap-4 pt-2">
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-red-300 hover:bg-red-50 hover:text-red-500"
                onClick={handleSkip}
              >
                <X className="h-6 w-6" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-12 w-12 rounded-full border-green-300 hover:bg-green-50 hover:text-green-500"
                onClick={handleLike}
              >
                <Heart className="h-6 w-6" />
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader className="pb-2">
              <div className="text-center">
                <h2 className="text-xl font-semibold">All Profiles Viewed!</h2>
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-gray-600">
                You&#39;ve checked all available profiles.
              </p>
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleReset}
                >
                  <RefreshCw className="h-4 w-4" />
                  Start Over
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
