'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SubmitHandler, Controller } from 'react-hook-form';
import SelectLoader from '@core/components/loader/select-loader';
import { Button, Input, Textarea } from 'rizzui';
import { Form } from '@core/ui/rizzui-ui/form';
import {
  ZohoLeadInput,
  zohoLeadsSchema,
} from '@/validators/zoho-leads-create.schema';
import {
  salutation,
  service,
  leadSource,
  agent,
} from '@/data/zoho-leads-create';
import { PhoneNumber } from '@/@core/ui/rizzui-ui/phone-input';
import axios from 'axios';
import toast from 'react-hot-toast';

// Dynamically import Select component with SSR disabled
const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => <SelectLoader />,
});

// Initial reset state
const initialResetState = {
  salutation: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  website: '',
  lead_source: '',
  agent: '',
  country: '',
  description: '',
};

const ZohoLeadCreateForm = () => {
  const [reset, setReset] = useState(initialResetState);
  const [isLoading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ZohoLeadInput> = async (data) => {

    setLoading(true);

    toast.promise(axios.post('/api/zoho/createLead', data), {
      loading: 'Uploading...',
      success: (response) => {
        setLoading(false);
        return response.data.message || 'Data sent to Zoho CRM successfully';
      },
      error: (error) => {
        setLoading(false);
        return error.message || 'Failed to send data to Zoho CRM';
      },
    });

    setReset(initialResetState);
  };

  return (
    <Form<ZohoLeadInput>
      validationSchema={zohoLeadsSchema}
      onSubmit={onSubmit}
      useFormProps={{
        mode: 'onChange',
        defaultValues: reset,
      }}
      resetValues={reset}
      className="isomorphic-form flex flex-grow flex-col @container"
    >
      {({ register, control, formState: { errors } }) => (
        <>
          <div className="max-w-7xl flex-grow p-10 pt-5">
            <div className="grid grid-cols-1 gap-3 @lg:gap-4 @2xl:gap-5 md:grid-cols-2">
              {/* Salutation and Name Fields */}
              <div className="grid gap-3 @lg:gap-4 @2xl:gap-5 md:col-span-2 md:grid-cols-5">
                <div className="md:col-span-1">
                  <Controller
                    name="salutation"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        dropdownClassName="!z-0"
                        options={salutation}
                        value={value}
                        onChange={onChange}
                        label="Salutation"
                        error={errors?.salutation?.message}
                        getOptionValue={(option) => option.value}
                      />
                    )}
                  />
                </div>
                <div className="md:col-span-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      label="First Name"
                      placeholder="First name"
                      {...register('first_name')}
                      error={errors.first_name?.message}
                    />
                    <Input
                      label="Last Name"
                      placeholder="Last name"
                      {...register('last_name')}
                      error={errors.last_name?.message}
                    />
                  </div>
                </div>
              </div>

              {/* Company and Email Fields */}
              <Input
                label="Company"
                placeholder="Company Name"
                {...register('company')}
                error={errors.company?.message}
              />
              <Input
                label="Email Address"
                placeholder="Email address"
                {...register('email')}
                error={errors.email?.message}
              />

              {/* Phone Number Field */}
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <PhoneNumber
                    {...field}
                    country="us"
                    label="Phone Number"
                    preferredCountries={['us']}
                    onChange={(value) => field.onChange(value)}
                    error={errors.phone?.message}
                    className="w-full"
                    inputClassName="!border-2"
                    placeholder="Phone Number"
                  />
                )}
              />

              {/* Service and Website Fields */}
              <Controller
                name="service"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    dropdownClassName="!z-0"
                    options={service}
                    value={value}
                    onChange={onChange}
                    label="Service"
                    error={errors?.service?.message}
                    getOptionValue={(option) => option.value}
                  />
                )}
              />
              <Input
                label="Website"
                placeholder="Website"
                {...register('website')}
                error={errors.website?.message}
              />

              {/* Lead Source and Agent Fields */}
              <Controller
                name="lead_source"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    dropdownClassName="!z-0"
                    options={leadSource}
                    value={value}
                    onChange={onChange}
                    label="Lead Source"
                    error={errors?.lead_source?.message}
                    getOptionValue={(option) => option.value}
                  />
                )}
              />
              <Controller
                name="agent"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    dropdownClassName="!z-0"
                    options={agent}
                    value={value}
                    onChange={onChange}
                    label="Agent"
                    error={errors?.agent?.message}
                    getOptionValue={(option) => option.value}
                  />
                )}
              />

              {/* Country and Description Fields */}
              <Input
                label="Country"
                placeholder="Country"
                {...register('country')}
                error={errors.country?.message}
              />
              <div className="md:col-span-2">
                <Textarea
                  label="Description"
                  placeholder="Description ...."
                  {...register('description')}
                  error={errors.description?.message}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 z-40 flex items-center justify-start gap-3 bg-gray-0/10 px-10 py-3 backdrop-blur @lg:gap-4 @xl:grid @xl:auto-cols-max @xl:grid-flow-col">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full @xl:w-auto"
            >
              Submit Lead
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default ZohoLeadCreateForm;
