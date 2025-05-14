import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "react-icons/ai";
import axios from "axios";
import {
  Aiprompt,
  SelectBudgetOptions,
  SelectTravelsList,
} from "../../constant/option";
import React, { cache } from "react";
import toast from "react-hot-toast";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { ChatSession } from "@/src/Service/aiModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { setDoc,doc } from "firebase/firestore";
import { db } from "../../Service/firebaseConfig";
import { useNavigate } from "react-router-dom";

const Createtrip = () => {
  const [place, setPlace] = React.useState([]);
  const [formdata, setformdata] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const [dialog, setdialog] = React.useState(false);
  const user=localStorage.getItem("user");
  const handlechange = (name, value) => {
    setformdata({ ...formdata, [name]: value });
  };
  const navigate=useNavigate();

  const GetuserProfile=async(tokeninfo)=>{
    try {
      const data=await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokeninfo?.access_token}`,{
        headers:{
          Authorization: `Bearer ${tokeninfo?.access_token}`,
          Accept: "application/json",
        }
      })
     
      setdialog(false);
      localStorage.setItem("user", JSON.stringify(data?.data));
      
    
    } catch (error) {
      console.log(error);
      
    }
  }

  const login= useGoogleLogin({
    onSuccess:(codeResponse) => GetuserProfile(codeResponse),
    onError:(error) => console.log(error),
  })

  const SaveAiresult=async(tripData)=>{
    try{
      setloading(true);
      const user=JSON.parse(localStorage.getItem("user"));
      const docId=Date.now().toString();
      await setDoc(doc(db, "trip", docId), {
        userSelection: formdata,
        tripData:JSON.parse(tripData),
        userEmail: user?.email,
        tripId: docId,     
      });
      setloading(false);
      toast.success("Trip Generated Successfully");
      navigate('/view-trip'+`/${docId}`);

    }catch(error){
      console.log(error);
    }
  }

  const generatetrip = async () => {
    

    if (
      !formdata?.budget ||
      !formdata?.traveler ||
      !formdata?.location ||
      !formdata?.noOfDays
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    if(!user){
      setdialog(true);
      return;
    }
    if (formdata.noOfDays > 5) {
      toast.error("Number of days should be less than 5");
      return;
    }
    if(formdata.noOfDays<=0){
      toast.error("Number of days should be greater than 0");
      return;
    }
    toast.loading('We are generationg your trip ... please wait');
    const Final_prompt = Aiprompt.replace("{location}", formdata.location.label)
      .replace("{totaldays}", formdata.noOfDays)
      .replace("{traveler}", formdata.traveler)
      .replace("{budget}", formdata.budget);
    console.log(Final_prompt);
    setloading(true);
    try {
      const result = await ChatSession(Final_prompt);
      toast.dismiss()
      setloading(false);
      SaveAiresult(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️</h2>
      <p className="text-xl text-gray-500 mt-3">
        Just provide some basic imformation,and our trip planner will generate a
        customized itinerary based on your preferences.{" "}
      </p>
      <div className="mt-15 flex flex-col gap-9 ">
        <div>
          <h2 className="text-xl font-medium my-3">
            What is your destination choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            selectProps={{
              place,
              onChange: (e) => {
                setPlace(e);
                handlechange("location", e);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip
          </h2>
          <Input
            placeholder="Ex-3"
            type={"number"}
            onChange={(e) => handlechange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 my-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                  formdata?.budget == item.title && "shadow-lg border-black"
                }`}
                onClick={() => handlechange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan on traveling with on your next adventure?{" "}
          </h2>
          <div className="grid grid-cols-3 gap-5 my-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer hover:shadow-lg ${
                  formdata?.traveler == item.people && "shadow-lg border-black"
                }`}
                onClick={() => handlechange("traveler", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-xl">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button
        disabled={loading}
         onClick={generatetrip}>
          {loading?
          <AiOutlineLoading className="animate-spin h-7 w-7 " />
            :'Generate Trip'

          }
          </Button>
      </div>
      <Dialog open={dialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="h-15" />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication </p>
              <Button onClick={login} className="w-full mt-5 flex gap-4 items-center"> 
                <FcGoogle className="h-7 w-7" />
                Sign In With Google  </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Createtrip;
