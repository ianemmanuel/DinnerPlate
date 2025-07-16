
import CreateProfileForm from '@restaurant-webapp/components/forms/CreateProfile'


export default function CreateVendorProfilePage() {
  return (
    <div className="space-y-6">
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Create Your Restaurant Profile</h1>
          <p className="text-muted-foreground">
            Set up your restaurant profile to start attracting customers
          </p>
        </div>
        <CreateProfileForm/>
      </div>
    </div>
  );
}