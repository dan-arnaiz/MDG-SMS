
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import { Form, FormItem } from '@/components/ui/form';
import { useNavigate,useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Import useForm
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod'; // Import zodResolver
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const noMailingSchema = z.object({

    email: z.string().email(),
    mobileNum: z.string().length(11, 'Invalid phone number'),
    landline: z.string().min(7).min(7,'Invalid phone number').max(8,'Invalid phone number').optional().or(z.literal('')),
    employeeEmail: z.string().email().min(10),
    permHouse: z.string().min(2).max(200),
    permStreet: z.string().min(2),
    permZip: z.string().length(4, 'Invalid Zip Code'),
    provinceP: z.string().min(1),
    cityP: z.string().min(1),
    barangayP: z.string().min(1),
    mailHouse: z.string().max(200).optional(),
    mailStreet: z.string().optional(),
    mailZip: z.string().length(4, 'Invalid Zip Code').optional().or(z.literal('')),
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

export default function EditEmployeeContacts() {

    const { id } = useParams();
    const [laoding, setLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);
    const [cities, setCities] = useState([]);
    const [city, setCity] = useState('');
    const [barangays, setBarangays] = useState([]);
    const [barangay, setBarangay] = useState('');
    const [cities2, setCities2] = useState([]);
    const [city2, setCity2] = useState('');
    const [barangays2, setBarangays2] = useState([]);
    const [barangay2, setBarangay2] = useState('');
    const [addressSimilarity, setAddressSimilarity] = useState(false);
    const defaultProfilePic = '/images/default-profile.png';
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, reset, getValues, setError, formState: { errors, isSubmitting, isDirty }, trigger, watch } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            addressSimilarity: false,
        },
    });

    const handleProvinceChange = async(provinceName, addresstype) => {
        const isPermanent = addresstype == 'permanent'

        const provinceId = provinces.find((p) => p.name === provinceName)?.id;

        if(isPermanent){
            setValue('provinceP',provinceName, { shouldDirty: true });
            trigger('provinceP');
        } else if (!addressSimilarity){
            setValue('provinceM',provinceName, { shouldDirty: true });
            trigger('provinceM');
        }

        if (provinceId) {
            await axiosClient.get(`/cities/${provinceId}`)
                .then(response => {
                    if (isPermanent) setCities(response.data);
                    else setCities2(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (isPermanent) setCities([]);
            else setCities2([]);
        }
    };

    const handleCityChange = async (cityName, addresstype) => {
        const isPermanent = addresstype === 'permanent';


        let cityId = 0;

        if (isPermanent) {
            cityId = cities.find((c) => c.name === cityName)?.id;
            setValue('cityP',cityName, { shouldDirty: true })
            trigger('cityP')
        } else if (!addressSimilarity){
            cityId = cities2.find((c) => c.name === cityName)?.id;
            setValue('cityM',cityName, { shouldDirty: true })
            trigger('cityM')
        }


        if (cityId) {
            await axiosClient.get(`/barangays/${cityId}`)
                .then(response => {
                    if (isPermanent) setBarangays(response.data);
                    else setBarangays2(response.data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        } else {
            if (isPermanent) setBarangays([]);
            else setBarangays2([]);
        }
    };

    const handleBarangayChange = async (barangayName,addresstype) => {
        const isPermanent = addresstype === 'permanent';

        let barangayId = 0

        if (isPermanent) {
            barangayId = barangays.find((b) => b.name === barangayName)?.id;
            setValue('barangayP',barangayName, { shouldDirty: true })
            trigger('barangayP')
        } else if (!addressSimilarity){
            barangayId = barangays2.find((b) => b.name === barangayName)?.id;
            setValue('barangayM',barangayName, { shouldDirty: true })
            trigger('barangayM')
        }
    }

    const handleCheckboxChange = (e) => {
        setAddressSimilarity(!addressSimilarity)

        setValue('addressSimilarity', !addressSimilarity);
        trigger('addressSimilarity');
    };

    useEffect(() => {
        LoadDetails();
    }, [])

    useEffect(() => {
        if (provinces.length > 0) LoadEmployee();
    }, [provinces])

    useEffect(() => {
        if (cities.length > 0) handleCityChange(city,'permanent')
        if (cities2.length > 0) handleCityChange(city2,'mailin')
    }, [cities],[cities2])

    useEffect(() => {
        if (barangays.length > 0) handleBarangayChange(barangay,'permanent')
        if (barangays.length > 0) handleBarangayChange(barangay2,'mailing')
    }, [barangays],[barangays2])

    const LoadDetails = () => {
        axiosClient.get(`/addemployee`)
        .then((response) => {
            console.log(response.data);
            setProvinces(response.data.provinces);
        })
        .catch(error => console.error('Error fetching cities:', error));
    }

    const LoadEmployee = () => {
        axiosClient.get(`/editemployeecontacts/${id}`)
        .then((request) => {
            console.log(request)
            reset({
                employeeEmail: request.data.emails.employeeEmail,
                email: request.data.emails.email,
                mobileNum: request.data.mobileNum.nums,
                landline: request.data.landline.nums,

                permHouse: request.data.permanentAddress.permHouse,
                permStreet: request.data.permanentAddress.permStreet,
                permZip: request.data.permanentAddress.permZip,
                cityP:request.data.permanentAddress.cityP,
                barangayP:request.data.permanentAddress.barangayP,

                mailHouse: request.data.mailAddress.mailHouse,
                mailStreet: request.data.mailAddress.mailStreet,
                mailZip: request.data.mailAddress.mailZip,
                cityM: request.data.mailAddress.cityM,
                barangayM:request.data.mailAddress.barangayM,

                addressSimilarity: request.data.permanentAddress.addressSimilarity ===1
            });

            setAddressSimilarity(request.data.permanentAddress.addressSimilarity === 1);

            setCity(request.data.permanentAddress.cityP);
            setCity2(request.data.mailAddress.cityM);

            setBarangay(request.data.permanentAddress.barangayP);
            setBarangay2(request.data.mailAddress.barangayM);

            handleProvinceChange(request.data.permanentAddress.provinceP,'permanent');
            handleProvinceChange(request.data.mailAddress.provinceM,'mailing');
        })
        .catch(error => console.error('Error fetching cities:', error));
    }

    const onSubmit = async(data) => {

        if (!isDirty) {
            alert('No new details were detected...')
            navigate(-1); // Go back if no fields are dirty
            return;
        }

        let personal = {
            employeeEmail: data?.employeeEmail?.trim(),
            email: data?.email?.trim(),
            mobileNum: data?.mobileNum?.trim(),
            landline: data?.landline?.trim() === "" ? null : data?.landline?.trim(),
        }

        const barangayId = barangays.find((b) => b.name === data?.barangayP)?.id;

        let permAddress = {
            houseBlockUnitNo: data?.permHouse,
            street: data?.permStreet,
            zipCode: data?.permZip?.trim(),
            barangay: barangayId,
            sameAddress: addressSimilarity
        }

        let mailAddress = null;

        if (!addressSimilarity){

            const barangay2Id = barangays2.find((b) => b.name === data?.barangayM)?.id;

            mailAddress = {
                houseBlockUnitNo: data?.mailHouse,
                street: data?.mailStreet,
                zipCode: data?.mailZip?.trim(),
                barangay: barangay2Id
            }
        }

        const payload = {
            personalData: personal,
            permAddressData: permAddress,
            mailAddressData: mailAddress
        }
        console.log(payload);

        try{
            await axiosClient.put(`/editemployeecontacts/${id}`, payload)
            alert(`Employee ${id} successfully updated!`)
            navigate(`/employee/${id}`);

        } catch(error) {
            if (error.response && error.response.status === 409 && error.response.data.errors) {
                const { errors: backendErrors } = error.response.data;
                // Set the errors returned by the backend into react-hook-form
                Object.keys(backendErrors).forEach((key) => {
                    setError(key, {
                        message: backendErrors[key]
                    });
                });
            } else {
                // Handle other errors if needed (e.g., network issues)
                const errorMessage = error.response ? error.response.data.message : "An unexpected error occurred.";
                alert(errorMessage);
            }
        }
    }

    return (
        <div className="main">
            <div className="header-toolbar">
                <h1 className="text-black font-bold font-sans text-lg">Add Employees</h1>   
                <Button onClick = {() => navigate('/employees')}>Back</Button>
            </div>
            <Form>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Organization Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FormItem>
                                <Label>Employee Email</Label>
                                <Input disabled={isSubmitting} {...register('employeeEmail')} className={`w-[100%] mb-3 ${errors.employeeEmail ? 'border-red-500' : ''}`}></Input>
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
                                    <Select value={getValues('provinceP')} disabled={isSubmitting} onValueChange={(value) => handleProvinceChange(value, 'permanent')}>
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
                                            <Checkbox disabled={isSubmitting} onClick={handleCheckboxChange}></Checkbox>
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
                        {errors && <p className="text-red-500 text-[10px] italic">{errors.message}</p>}
                        <Button disabled={isSubmitting} type="submit" className='w-[200px] mb-5 bg-white'>
                            {isSubmitting ? "Loading..." : "Save Changes"}
                        </Button>
                        </div>
                </form>
            </Form>
        </div>
    );
}