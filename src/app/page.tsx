'use client';
import {getAllAccounts, getByIdAccounts} from "~/server/service /tincaster.service";
import {useState} from "react";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card"
import { Button } from "~/components/ui/button"
import { X, Heart, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function HomePage() {
  const getAllAccountsHandler = async () => {
    const res = await getAllAccounts();
    console.log(res);
  }
  const getAccountByIdHandler= async (id: number) => {
    const res = await getByIdAccounts(id);
    console.log(res);
  }
  const profiles = [
    {
      id: 1,
      name: "Alex Johnson",
      bio: "Software developer who loves hiking and photography",
      image: "https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/9c3707aa-60af-41e5-70f8-be31c6ded900/rectcrop3",
    },
    {
      id: 2,
      name: "Sam Taylor",
      bio: "Graphic designer with a passion for travel and coffee",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 3,
      name: "Jordan Smith",
      bio: "Marketing specialist who enjoys cooking and reading",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 4,
      name: "Casey Brown",
      bio: "Fitness instructor who loves music and outdoor activities",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      id: 5,
      name: "Riley Wilson",
      bio: "Teacher who enjoys painting and playing guitar",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  // useEffect(async () => {
  //   const all = await getAllAccounts();
  //   setProfiles(all);
  // }, []);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [allProfilesViewed, setAllProfilesViewed] = useState<boolean>(false)

  const handleSkip = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setAllProfilesViewed(true)
    }
  }

  const handleLike = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setAllProfilesViewed(true)
    }
  }

  const handleReset = () => {
    setCurrentIndex(0)
    setAllProfilesViewed(false)
  }

  return (
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        <h1 className="text-2xl font-bold mb-6">Profile Matcher</h1>

        <div className="w-full max-w-md">
          {!allProfilesViewed && currentIndex < profiles.length ? (
              <Card className="w-full">
                <CardHeader className="flex flex-col items-center pt-6">
                  <div className="relative w-32 h-32 mb-4">
                    <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-gray-100">
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
                    <h2 className="text-xl font-semibold">{profiles[currentIndex].name}</h2>
                  </div>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600">{profiles[currentIndex].bio}</p>
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
                  <p className="text-gray-600 mb-4">You&#39;ve checked all available profiles.</p>
                  <div className="flex justify-center">
                    <Button variant="outline" className="flex items-center gap-2" onClick={handleReset}>
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
