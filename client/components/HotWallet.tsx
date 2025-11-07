import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader, Copy, Lock, LogOut, Mail, Github, Twitter, Chrome } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface HotWalletUser {
  id: string;
  email: string;
  provider: 'email' | 'google' | 'discord' | 'twitter';
  walletAddress: string;
  createdAt: Date;
}

export function HotWallet() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<HotWalletUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEmailSignup = async () => {
    if (!email || !password) {
      toast({
        title: 'Error',
        description: 'Please enter email and password',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsConnecting(true);
      // Mock signup - in production, this would call your backend
      const mockUser: HotWalletUser = {
        id: `user_${Date.now()}`,
        email,
        provider: 'email',
        walletAddress: '0x' + Math.random().toString(16).slice(2),
        createdAt: new Date(),
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      toast({
        title: 'Success',
        description: 'Wallet created successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create wallet',
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'discord' | 'twitter') => {
    try {
      setIsConnecting(true);
      // Mock social login - in production, this would use OAuth
      const mockUser: HotWalletUser = {
        id: `user_${Date.now()}`,
        email: `user_${Date.now()}@social.local`,
        provider,
        walletAddress: '0x' + Math.random().toString(16).slice(2),
        createdAt: new Date(),
      };

      setUser(mockUser);
      setIsAuthenticated(true);
      toast({
        title: 'Success',
        description: `Connected with ${provider}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to connect with ${provider}`,
        variant: 'destructive',
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleCopyAddress = () => {
    if (user?.walletAddress) {
      navigator.clipboard.writeText(user.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out',
    });
  };

  if (isAuthenticated && user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" />
            Hot Wallet
          </CardTitle>
          <CardDescription>
            Custodial wallet - Your secure on-chain account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <Lock className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800 dark:text-green-200">
              Your wallet is secure and managed by VirtDEX
            </AlertDescription>
          </Alert>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Account Provider
              </label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="font-semibold capitalize">{user.provider}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Email
              </label>
              <div className="mt-2 p-3 bg-muted rounded-lg break-all">
                <p className="font-mono text-sm">{user.email}</p>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Wallet Address
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={user.walletAddress}
                  readOnly
                  className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm border-none"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className="px-3"
                >
                  <Copy
                    size={18}
                    className={copied ? 'text-accent' : ''}
                  />
                </Button>
              </div>
              {copied && (
                <p className="text-sm text-accent mt-2">Copied to clipboard!</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Member Since
              </label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <p className="text-sm">
                  {user.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-accent" />
          Create Hot Wallet
        </CardTitle>
        <CardDescription>
          Create a secure custodial wallet with social login
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            onClick={handleEmailSignup}
            disabled={isConnecting}
            className="w-full"
          >
            {isConnecting ? (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Mail className="mr-2 h-4 w-4" />
            )}
            Sign Up with Email
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={isConnecting}
          >
            <Chrome className="mr-2 h-4 w-4" />
            Google
          </Button>

          <Button
            variant="outline"
            onClick={() => handleSocialLogin('discord')}
            disabled={isConnecting}
          >
            <Github className="mr-2 h-4 w-4" />
            Discord
          </Button>
        </div>

        <Button
          variant="outline"
          className="w-full"
          onClick={() => handleSocialLogin('twitter')}
          disabled={isConnecting}
        >
          <Twitter className="mr-2 h-4 w-4" />
          Twitter/X
        </Button>

        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription className="text-xs">
            Your private keys are encrypted and stored securely on VirtDEX
            servers. You maintain full control over your assets.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
