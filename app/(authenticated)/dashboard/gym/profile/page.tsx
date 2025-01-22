import { GymProfileForm } from "./gym-profile-form";


export default function GymProfilePage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Perfil da Academia</h1>
          <p className="text-muted-foreground">
            Gerencie as informações públicas da sua academia
          </p>
        </div>
        <GymProfileForm />
      </div>
    </div>
  )
}
