import { useState, useEffect, useRef } from 'react';
import { Form, FormItem } from '@/components/ui/form';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { promise, z } from 'zod';
import { Toaster } from "@/components/ui/sonner";  
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table" 
import { Label } from '@/components/ui/label';
import axiosClient from "../../axios-client.js";
import ReviewModal from '../../components/dialogs/ReviewModal.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx'; // Import the context
import { DialogClose } from '@radix-ui/react-dialog';
import { Check, LucideSquareBottomDashedScissors } from 'lucide-react';


const noMailingSchema = z.object({
    studentEmail: z.string().email().min(10),
    email: z.string().email(),
    mobileNum: z.string().length(11, 'Invalid phone number'),
    landline: z.string().min(7).min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    permHouse: z.string().min(2).max(200),
    permStreet: z.string().min(2),
    permZip: z.string().length(4, 'Invalid Zip Code'),
    mailHouse: z.string().max(200).optional(),
    mailStreet: z.string().optional(),
    mailZip: z.string().length(4, 'Invalid Zip Code').optional().or(z.literal('')),
    provinceP: z.string().min(1),
    cityP: z.string().min(1),
    barangayP: z.string().min(1),
    provinceM: z.string().optional(),
    cityM: z.string().optional(),
    barangayM: z.string().optional(),
    addressSimilarity: z.literal(true),
});

const MailingSchema = noMailingSchema.extend({
    mailHouse: z.string().min(2),  // Required for mailing
    mailStreet: z.string().min(2),
    mailZip: z.string().min(2),
    provinceM: z.string().min(1),
    cityM: z.string().min(1),
    barangayM: z.string().min(1),
    addressSimilarity: z.literal(false),
});

const formSchema = z.discriminatedUnion('addressSimilarity', [
        MailingSchema,
        noMailingSchema,
]);

export default function EditStudentContact() {

    const { id } = useParams();
    const [mobileId,setMobileId] = useState(0);
    const [landlineId,setLandlineId] = useState(0);
    const [permId,setPermId] = useState(0);
    const [mailId,setMailId] = useState(0);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [city,setCity] = useState("");
    const [barangays, setBarangays] = useState([]);
    const [barangay, setBarangay] = useState("");
    const [cities2, setCities2] = useState([]);
    const [city2,setCity2] = useState("");
    const [barangays2, setBarangays2] = useState([]);
    const [barangay2, setBarangay2] = useState("");
    const [addressSimilarity, setAddressSimilarity] = useState(false);
    const {user} = useStateContext();

    const { register, handleSubmit, getValues, setValue, reset, formState: { errors, isSubmitting, isDirty, dirtyFields }, trigger } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            addressSimilarity: false,
          },
    });

    useEffect(() => {
            loadFirstResources();
    }, []);

    useEffect(() => {
        if (provinces.length > 0) {
            loadStudent(); // Now that provinces are available, load student data
        }
    }, [provinces]);

    useEffect( () => {

        if (cities.length > 0 && city) {
            handleCityChange(city, 'permanent');
        }
        if (cities2.length > 0 && city2) {
            handleCityChange(city2, 'mailing');
        }

    }, [cities, cities2]);

    useEffect(() => {
        if (barangays.length > 0 && barangay) {
            handleBarangayChange(barangay, 'permanent');
        }
        if (barangays2.length > 0 && barangay2) {
            handleBarangayChange(barangay, 'mailing');
        }
    }, [barangays, barangays2]);

    const loadFirstResources = () => {
        axiosClient.get('/addstudent')
      .then((response) => {
        setProvinces(response.data.provinces);
        console.log(response.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
    } 

    const loadStudent = async () => {
        await axiosClient.get(`/editstudentcontact/${id}`)
        .then(async (response) => {
            console.log("Contact data:", response.data);
            reset({
                studentEmail: response.data.studentEmail,
                email: response.data.email,
                mobileNum: response.data.mobileNum.nums,
                landline: response.data.landline?.nums ?? "",
                addressSimilarity: response.data.permanentAddress.addressSimilarity === 1,

                permHouse: response.data.permanentAddress.permHouse,
                permStreet: response.data.permanentAddress.permStreet,
                permZip: response.data.permanentAddress.permZip,  
                provinceP: response.data.permanentAddress.provinceP,  
                cityP: response.data.permanentAddress.cityP,  
                barangayP: response.data.permanentAddress.barangayP,  

                mailHouse: response.data.mailAddress?.mailHouse ?? "",
                mailStreet: response.data.mailAddress?.mailStreet ?? "",
                mailZip: response.data.mailAddress?.mailZip ?? "",  
                provinceM: response.data.mailAddress?.provinceM ?? "",
                cityM: response.data.mailAddress?.cityM ?? "",  
                barangayM: response.data.mailAddress?.barangayM ?? "",       
            });

            setMobileId(response.data.mobileNum.id);
            setLandlineId(response.data.landline?.id ?? 0);

            setPermId(response.data.permanentAddress.id);
            setMailId(response.data.mailAddress?.id ?? 0);

            setCity(response.data.permanentAddress.cityP);
            setCity2(response.data.mailAddress?.cityM ?? "");

            setBarangay(response.data.permanentAddress.barangayP);
            setBarangay2(response.data.mailAddress?.barangayM ?? "");

            await new Promise((resolve) => setTimeout(resolve, 50));

            handleProvinceChange(response.data.permanentAddress.provinceP,'permanent');
            handleProvinceChange(response.data.mailAddress?.provinceM ?? "",'mailing');

            setAddressSimilarity(response.data.permanentAddress.addressSimilarity === 1);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }

    const handleProvinceChange = async (provinceName, addresstype) => {
        const isPermanent = addresstype === 'permanent';

        // Set value and trigger validation if needed
        const provinceId = provinces.find((p) => p.name === provinceName)?.id;

        if (isPermanent) {
            setValue('provinceP', provinceName, { shouldDirty: true });
            trigger('provinceP');
        } else if (!addressSimilarity) {
            setValue('provinceM', provinceName, { shouldDirty: true });
            trigger('provinceM');
        }

        if (provinceId) {
            try {
                const response = await axiosClient.get(`/cities/${provinceId}`);
                if (isPermanent) setCities(response.data);
                else setCities2(response.data);

            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        } else {
            if (isPermanent) setCities([]);
            else setCities2([]);
        }
    };

    const handleCityChange = async(cityName, addresstype) => {
        const isPermanent = addresstype === 'permanent';

        let cityId = 0;

        if (isPermanent) {
            cityId = cities.find((c) => c.name === cityName)?.id;
            setValue('cityP', cityName, { shouldDirty: true });
            trigger('cityP');
        } else if (!addressSimilarity) {
            cityId = cities2.find((c) => c.name === cityName)?.id;
            setValue('cityM', cityName, { shouldDirty: true });
            trigger('cityM');
        }
        if (cityId) {
            try {
                const response = await axiosClient.get(`/barangays/${cityId}`);
                if (isPermanent) setBarangays(response.data);
                else setBarangays2(response.data);
            } catch (error) {
                console.error('Error fetching barangays:', error);
            }
        } else {
            if (isPermanent) setBarangays([]);
            else setBarangays2([]);
        }
    };

    const handleBarangayChange = (barangayName,addresstype) => {
        const isPermanent = addresstype === 'permanent';

        if (isPermanent) {
            setValue('barangayP',barangayName, { shouldDirty: true })
            trigger('barangayP')
        } else if (!addressSimilarity){
            setValue('barangayM',barangayName, { shouldDirty: true })
            trigger('barangayM')
        }
    }

    const handleCheckboxChange = (e) => {
        setAddressSimilarity(!addressSimilarity)

        setValue('addressSimilarity', !addressSimilarity, { shouldDirty: true });
        trigger('addressSimilarity');
    };

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        console.log(getValues('provinceM'))
        console.log('Dirty Fields:', dirtyFields);

        if (!isDirty) {
            navigate(-1); // Go back if no fields are dirty
            return;
        }

        let userId = user?.id

        let personal = {
            studentEmail: data?.studentEmail?.trim(),
            email: data?.email?.trim(),
            mobileId: mobileId,
            mobileNum: data?.mobileNum?.trim(),
            landlineId: landlineId,
            landline: data?.landline?.trim() === "" ? null : data?.landline?.trim(),
        }

        const barangayId = barangays.find((b) => b.name === data?.barangayP)?.id;

        let permAddress = {
            id: permId,
            houseBlockUnitNo: data?.permHouse,
            street: data?.permStreet,
            zipCode: data?.permZip?.trim(),
            barangay: barangayId
        }

        let sameAddress = addressSimilarity;

        let mailAddress = null;

        if (!addressSimilarity){

            const barangay2Id = barangays2.find((b) => b.name === data?.barangayM)?.id;

            mailAddress = {
                id: mailId,
                houseBlockUnitNo: data?.mailHouse,
                street: data?.mailStreet,
                zipCode: data?.mailZip?.trim(),
                barangay: barangay2Id
            }
        }

        const payload ={
            userId,
            personal,
            permAddress,
            mailAddress, 
            sameAddress         
        }

        console.log(payload);

        try{
            await axiosClient.put(`/editstudentcontact/${id}`, payload);
            alert(`Student ${id} successfully updated!`);
            navigate(`/students/${id}`); // Fix: Use `data.studentNo`
        } catch (err) {
            console.error("Update failed:", err.response?.data || err.message);
        }  
    }
  
    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg pt-1">Add Student</h1>
                <Button className="hover:bg-slate-500 border hover:black hover:text-white" onClick={() => window.history.back()}>Cancel</Button>
            </div>
            <Form>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>                               
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-[20px]'>
                            <FormItem className='w-[=100%]'>
                                <Label>School Email</Label>
                                <Input disabled={isSubmitting} type="email" {...register('studentEmail')} className={`w-[100%] mb-3 ${errors.studentEmail ? 'border-red-500' : ''}`}/>
                                {errors.studentEmail && <p className="text-red-500 text-[10px] italic">{errors.studentEmail.message}</p>}
                            </FormItem>                          
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>           
                            <FormItem>
                                <Label>Personal Email</Label>
                                <Input disabled={isSubmitting} type="email" {...register('email')} className={`w-[100%] mb-3 ${errors.email ? 'border-red-500' : ''}`}/>
                                {errors.email && <p className="text-red-500 text-[10px] italic">{errors.email.message}</p>}
                            </FormItem>
                            <div className='flex flex-row gap-[10%] w-[100%]'>
                                <FormItem className='w-[50%]'>
                                    <Label>Mobile Number</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('mobileNum')} className={`w-[100%] mb-3 ${errors.mobileNum ? 'border-red-500' : ''}`}/>
                                    {errors.mobileNum && <p className="text-red-500 text-[10px] italic">{errors.mobileNum.message}</p>}
                                </FormItem>
                                <FormItem className='w-[50%]'>
                                    <Label>Landline Number</Label>
                                    <Input disabled={isSubmitting} type="text" {...register('landline')} className={`w-[100%] mb-3 ${errors.landline ? 'border-red-500' : ''}`}/>
                                    {errors.landline && <p className="text-red-500 text-[10px] italic">{errors.landline.message}</p>}            
                                </FormItem>
                            </div>                       
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Permanent Address</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col gap-5'>
                            <FormItem>
                                <Label>House/Block/Unit No.</Label>
                                <Input disabled={isSubmitting} type="text" {...register('permHouse')} className={`w-[100%] mb-3 ${errors.permHouse ? 'border-red-500' : ''}`}/>
                                {errors.permHouse && <p className="text-red-500 text-[10px] italic">{errors.permHouse.message}</p>}
                            </FormItem>
                            <FormItem>
                                <Label>Street</Label>
                                <Input disabled={isSubmitting} type="text" {...register('permStreet')} className={`w-[100%] mb-3 ${errors.permStreet ? 'border-red-500' : ''}`}/>                 
                            </FormItem> 
                            <FormItem>
                                <Label>Province</Label>
                                <Select value={getValues('provinceP')} disabled={isSubmitting} onValueChange={(value) => {handleProvinceChange(value, 'permanent')}}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.provinceP ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select Province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {provinces.map((provinces, index) => (
                                                <SelectItem key={index} value={provinces.name}>
                                                    {provinces.name}
                                                </SelectItem>
                                            ))}                           
                                        </SelectContent>
                                </Select>
                            </FormItem>                    
                            <FormItem>
                                <Label>City</Label>
                                <Select value={getValues('cityP')} disabled={isSubmitting} onValueChange={(value) => handleCityChange(value, 'permanent')}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.cityP ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select City" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((cities, index) => (
                                                    <SelectItem key={index} value={cities.name}>
                                                        {cities.name}
                                                    </SelectItem>
                                                ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>                       
                            <FormItem>
                                <Label>Barangay</Label>
                                <Select value={getValues('barangayP')} disabled={isSubmitting} onValueChange={(value) => handleBarangayChange(value, 'permanent')}>
                                    <SelectTrigger className={`w-[100%] mb-3 ${errors.barangayP ? 'border-red-500' : ''}`}>
                                        <SelectValue placeholder="Select Barangay" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {barangays.map((barangays, index) => (
                                                        <SelectItem key={index} value={barangays.name}>
                                                            {barangays.name}
                                                        </SelectItem>
                                                    ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            <div>
                                <Label>Zip Code</Label>
                                <div className='flex flex-row gap-[10%] justify-between'>
                                    <FormItem>                               
                                        <Input disabled={isSubmitting} type="text" {...register('permZip')} {...register('permZip')} className={`w-[100%] mb-3 ${errors.permZip ? 'border-red-500' : ''}`}  />
                                        {errors.permZip && <p className="text-red-500 text-[10px] italic">{errors.permZip.message}</p>}
                                    </FormItem>
                                    <div className='flex flex-row gap-3 text-center'>
                                        <Checkbox checked={getValues('addressSimilarity')} disabled={isSubmitting} onClick={handleCheckboxChange}></Checkbox>
                                        <Label>Use permanent address as mailing address</Label>
                                    </div>
                                </div>                                                                        
                            </div>                        
                        </CardContent>
                    </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Mailing Address</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-5'>
                                <FormItem>
                                    <Label>House/Block/Unit No.</Label>
                                    <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailHouse')} className={`w-[100%] mb-3 ${errors.mailHouse ? 'border-red-500' : ''}`}/>
                                    {errors.mailHouse && <p className="text-red-500 text-[10px] italic">{errors.mailHouse.message}</p>}                
                                </FormItem>
                                <FormItem>
                                    <Label>Street</Label>
                                    <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailStreet')}  className={`w-[100%] mb-3 ${errors.mailStreet ? 'border-red-500' : ''}`}/>
                                </FormItem>  
                                <FormItem>
                                    <Label>Province</Label>
                                    <Select value={getValues('provinceM')} disabled={addressSimilarity || isSubmitting}  onValueChange={(value) => handleProvinceChange(value, 'mailing')}>
                                            <SelectTrigger className={`w-[100%] mb-3 ${errors.provinceM ? 'border-red-500' : ''}`}>
                                                <SelectValue placeholder="Select Province" />
                                            </SelectTrigger>
                                            <SelectContent>                                       
                                                {provinces.map((provinces, index) => (
                                                    <SelectItem key={index} value={provinces.name}>
                                                        {provinces.name}
                                                    </SelectItem>
                                                ))}                           
                                            </SelectContent>
                                    </Select>
                                </FormItem>                   
                                <FormItem>
                                    <Label>City</Label>
                                    <Select value={getValues('cityM')} disabled={addressSimilarity || isSubmitting} onValueChange={(value) => handleCityChange(value, 'mailing')}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.cityM ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select City" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {cities2.map((cities2, index) => (
                                                        <SelectItem key={index} value={cities2.name}>
                                                            {cities2.name}
                                                        </SelectItem>
                                                    ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>                      
                                <FormItem>
                                    <Label>Barangay</Label>
                                    <Select value={getValues('barangayM')} disabled={addressSimilarity || isSubmitting} onValueChange={(value) => handleBarangayChange(value, 'mailing')}>
                                        <SelectTrigger className={`w-[100%] mb-3 ${errors.barangayM ? 'border-red-500' : ''}`}>
                                            <SelectValue placeholder="Select Barangay" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {barangays2.map((barangays2, index) => (
                                                            <SelectItem key={index} value={barangays2.name}>
                                                                {barangays2.name}
                                                            </SelectItem>
                                                        ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                                <div>
                                    <Label>Zip Code</Label>
                                    <div className='flex flex-row gap-[10%] justify-between'>
                                        <FormItem>                               
                                            <Input disabled={addressSimilarity || isSubmitting} type="text" {...register('mailZip')} className={`w-[100%] mb-3 ${errors.mailZip ? 'border-red-500' : ''}`} />
                                            {errors.mailZip && <p className="text-red-500 text-[10px] italic">{errors.mailZip.message}</p>} 
                                        </FormItem>
                                    </div>                                                                        
                                </div>                        
                            </CardContent>
                        </Card>
                    <div className='flex justify-center'>
                        {errors && Object.keys(errors).map((fieldName) => (
                            <p key={fieldName} className="text-red-500 text-[10px] italic">
                            {errors[fieldName]?.message}
                            </p>
                        ))}
                        <Button disabled={isSubmitting} type="submit" className='w-[200px] mb-5 bg-white'>
                            {isSubmitting ? "Loading..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </Form>  
    </div>
    );  
}