import React from 'react';
import { MapPin, Building, Globe, Mail } from 'lucide-react';
import { Input } from '../common/Input';

export const ShippingForm = ({ formData, onChange, errors = {} }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <MapPin className="w-5 h-5 text-brand-buy" />
        <h3 className="font-heading font-bold text-base text-slate-800">
          Shipping Address
        </h3>
      </div>

      <Input
        label="Street Address"
        name="street"
        value={formData.street}
        onChange={onChange}
        placeholder="House/Flat No., Building Name, Street Name"
        icon={MapPin}
        error={errors.street}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={onChange}
          placeholder="New Delhi"
          icon={Building}
          error={errors.city}
          required
        />

        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={onChange}
          placeholder="Delhi"
          icon={Building}
          error={errors.state}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Zip Code / Pincode"
          name="zipCode"
          value={formData.zipCode}
          onChange={onChange}
          placeholder="110001"
          icon={Mail}
          error={errors.zipCode}
          required
        />

        <Input
          label="Country"
          name="country"
          value={formData.country}
          onChange={onChange}
          placeholder="India"
          icon={Globe}
          error={errors.country}
          required
        />
      </div>
    </div>
  );
};