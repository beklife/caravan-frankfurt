import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/lib/MusicContext";
import { LanguageProvider } from "@/lib/LanguageContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MenuPage from "@/pages/MenuPage";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";
import UsbekischesRestaurant from "@/pages/UsbekischesRestaurant";
import HalalRestaurant from "@/pages/HalalRestaurant";
import PlovFrankfurt from "@/pages/PlovFrankfurt";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicProvider>
          <LanguageProvider>
            <Toaster />
            <Router base={import.meta.env.BASE_URL}>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/menu" component={MenuPage} />
                <Route path="/impressum" component={Impressum} />
                <Route path="/datenschutz" component={Datenschutz} />
                <Route path="/usbekisches-restaurant-frankfurt" component={UsbekischesRestaurant} />
                <Route path="/halal-restaurant-frankfurt" component={HalalRestaurant} />
                <Route path="/plov-frankfurt" component={PlovFrankfurt} />
                <Route component={NotFound} />
              </Switch>
            </Router>
          </LanguageProvider>
        </MusicProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
