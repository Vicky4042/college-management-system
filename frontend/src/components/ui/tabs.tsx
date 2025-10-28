import * as React from 'react';
import { cn } from '@/lib/utils'; // optional, for className merging

// --------------------
// Tabs Root
// --------------------
interface TabsProps {
  defaultValue?: string;
  children?: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className }) => {
  // optional state handling
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  // Clone children to pass activeTab and setter if needed
  return <div className={cn('tabs-root', className)}>{children}</div>;
};

// --------------------
// Tabs List
// --------------------
interface TabsListProps {
  children?: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={cn('tabs-list flex', className)}>{children}</div>;
};

// --------------------
// Tabs Trigger
// --------------------
interface TabsTriggerProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, children, className, onClick }) => {
  return (
    <button
      className={cn('tabs-trigger px-3 py-1 rounded', className)}
      onClick={onClick}
      data-value={value}
    >
      {children}
    </button>
  );
};

// --------------------
// Tabs Content
// --------------------
interface TabsContentProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({ value, children, className }) => {
  return <div className={cn('tabs-content', className)}>{children}</div>;
};
