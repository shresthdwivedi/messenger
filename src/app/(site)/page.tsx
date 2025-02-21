import GridBackground from '@/components/GridBackground';
import AuthForm from '@/components/AuthForm';
import GlowingBorder from '@/components/GlowingBorder';

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <GridBackground>        
        <GlowingBorder>
          <AuthForm />
        </GlowingBorder>
      </GridBackground>
    </div>
  );
}

