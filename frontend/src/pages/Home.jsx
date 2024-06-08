import settings from "@/data/SiteSettings.json";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [fetchingYoutubeVideos, setFetchingYoutubeVideos] = useState(true);

  const fetchYoutubeVideo = () => {
    setFetchingYoutubeVideos(true);
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          channelId: settings.user_youtube_channel_id,
          maxResults: 8,
          order: "date",
          type: "video",
          key: process.env.GOOGLE_API_KEY,
        },
      })
      .then((res) => {
        const videoUrls = res.data.items.map(
          (item) => "https://www.youtube.com/embed/" + item.id.videoId
        );
        setVideos(videoUrls);
      })
      .finally(() => setFetchingYoutubeVideos(false));
  };

  useEffect(() => {
    fetchYoutubeVideo();
  }, []);
  return (
    <main>
      <section className="h-[100vh] relative text-white">
        {/* background */}
        <div className="hero-background absolute z-1 w-full h-full blur-[2px]">
          <img
            className="w-full h-full object-cover"
            src={settings.site_background_image}
            alt="site background"
          />
        </div>
        {/* overlay */}
        <div className="bg-black absolute opacity-20 z-2 w-full h-full"></div>

        {/* content */}
        <div className="absolute z-3 w-full h-full">
          <div className="w-full h-full flex flex-col md:flex-row items-center justify-center md:gap-5">
            {/* User Image */}
            <div className="">
              <img
                className="h-40 w-40 md:h-60 md:w-60 rounded-sm object-cover border border-2 border-gray-100"
                src={settings.user_profile_image}
                alt={settings.user_name}
              />
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-4xl md:text-6xl font-bold mt-4 md:my-2">
                {settings.user_name}
              </h1>
              <p className="text-md md:text-xl text-gray-300">
                {settings.user_bio}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Button className="bg-transparent" variant="outline" asChild>
                  <a href="#contact">Contact me</a>
                </Button>
                <Button className="bg-blue-700 hover:bg-blue-800">
                  Explore
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      <section className="w-full py-10">
        <h2 className="text-2xl mb-5 md:text-3xl font-bold text-center">
          My Videos
        </h2>
        <div className="px-10 md:px-20">
          {fetchingYoutubeVideos ? (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {videos.map((videoUrl, idx) => (
                <div key={idx} className="relative w-full h-56">
                  <iframe
                    className="w-full h-full"
                    src={videoUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center">No videos found</p>
          )}

          <div className="flex justify-center mt-10">
            <Button className="bg-blue-700 hover:bg-blue-800" asChild>
              <a href={settings.user_youtube_link} target="_blank">
                Watch More
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Separator />

      <section className="w-full py-10" id="contact">
        <h2 className="text-2xl mb-5 md:text-3xl font-bold text-center">
          Contact me
        </h2>
        <div className="flex items-center flex-col md:items-stretch md:flex-row md:justify-center gap-5">
          {/* info */}
          <div className="w-[300px] border py-10 px-10 flex flex-col items-center">
            <img
              className="w-40 h-40 object-cover rounded-full border-2 border-white"
              src={settings.user_profile_image}
              alt={settings.user_name}
            />
            <p className="text-2xl font-semibold text-center my-2">
              {settings.user_name}
            </p>

            {/* Contact info */}
            <ul className="text-lg md:text-base">
              <li className="my-4 md:my-1 hover:underline underline-offset-2 cursor-pointer">
                <i className="fa-solid fa-phone me-2"></i>
                <a
                  href={`tel:${settings.user_phone}`}
                  className="text-gray-500"
                >
                  {settings.user_phone}
                </a>
              </li>
              <li className="my-4 md:my-1 hover:underline underline-offset-2 cursor-pointer">
                <i className="fa-solid fa-envelope me-2"></i>
                <a
                  href={`mailto:${settings.user_email}`}
                  className="text-gray-500"
                >
                  {settings.user_email}
                </a>
              </li>
            </ul>

            {/* Social links */}
            <ul className="mt-3 flex justify-center text-3xl md:text-2xl gap-8 md:gap-5">
              {settings.user_social_links.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-blue-700"
                  >
                    <i className={item.icon}></i>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* map */}
          <div>
            <iframe
              className="h-full w-[300px] lg:w-[600px] border"
              src={settings.user_location_link}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
