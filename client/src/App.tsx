import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/lib/MusicContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MenuPage from "@/pages/MenuPage";
import Impressum from "@/pages/Impressum";
import Datenschutz from "@/pages/Datenschutz";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <MusicProvider>
          <Toaster />
          <Router basepath={import.meta.env.BASE_URL}>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/menu" component={MenuPage} />
              <Route path="/impressum" component={Impressum} />
              <Route path="/datenschutz" component={Datenschutz} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </MusicProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
