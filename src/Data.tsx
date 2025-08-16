import {
  BookCopy,
  Megaphone,
  GalleryVerticalEnd,
  LayoutDashboard,
  PencilRuler,
  Settings,
  User,
  MessageCircle,
  type LucideIcon,
} from "lucide-react"

// Types remain the same for structure
export type {
  User,
  Organization,
  NavItem,
  Submissions,
  AppData
};

type User = {
  name: string;
  role: string;
  email: string;
  avatar: string;
};

type Organization = {
  name: string;
  logo: LucideIcon;
  plan: string;
};

type NavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

type Submissions = {
  month: string;
  desktop: number;
  mobile: number;
};
type SubmConf = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} 

type AppData = {
  user: User;
  main: Organization[];
  navMain: NavItem[];
  navSecondary: NavItem[];
  subm: Submissions[]
  projects: any[];
};

// Keep only essential static data that doesn't come from API
export const data: AppData = {
  user: {
    name: "",
    role: "",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  },
  main: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    }
  ],
  // Navigation structure - this can remain static
  navMain: [
    {
      title: "Dashboard",
      url: "/sdash",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dash Sub1",
          url: "/sdash/sub1",
        },
        {
          title: "Dash Sub2",
          url: "/sdash/sub2",
        },
        {
          title: "Dash Sub3",
          url: "/sdash/sub3",
        },
      ],
    },
    {
      title: "Submissions",
      url: "/ssubm",
      icon: BookCopy,
      isActive: true,
      items: [
        {
          title: "Subm Sub1",
          url: "/ssubm/sub1",
        },
        {
          title: "Subm Sub2",
          url: "/ssubm/sub2",
        },
        {
          title: "Subm Sub3",
          url: "/ssubm/sub3",
        },
      ],
    },
    {
      title: "Assign Reviewer",
      url: "/sassign-reviewer",
      icon: User,
      isActive: true,
    },
    {
      title: "Review Submission",
      url: "/sreview-submission",
      icon: BookCopy,
      isActive: true,
    },
    {
      title: "Deviation Management",
      url: "/sdevi",
      icon: PencilRuler,
      isActive: true,
    },
    {
      title: "Create announcement",
      url: "/screate-announcement",
      icon: Megaphone,
      isActive: true,
    },
    {
      title: "Message",
      url: "/smessages",
      icon: MessageCircle,
      isActive: true,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ],
  subm: [], // Will be populated from API
  projects: [],
};