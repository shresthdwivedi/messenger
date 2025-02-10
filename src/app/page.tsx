import { SparklesPreview } from '@/components/SparklesPreview';

import { LoginForm } from '@/components/login-form';
import GlowingBorder from '@/components/GlowingBorder';

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <SparklesPreview>
        <GlowingBorder area={"w-auto"}>
          <LoginForm />
        </GlowingBorder>
      </SparklesPreview>
    </div>
  );
}

