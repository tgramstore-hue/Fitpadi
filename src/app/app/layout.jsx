import InAppSidebar from '../../components/InAppSidebar.jsx';
import InAppHeader from '../../components/InAppHeader.jsx';
import InAppBottomNav from '../../components/InAppBottomNav.jsx';
import WorkoutModal from '../../components/WorkoutModal.jsx';

export default function AppLayout({ children }) {
  return (
    <div className="shell pg">
      <InAppSidebar />
      <section className="main">
        <InAppHeader />
        {children}
        <WorkoutModal />
      </section>
      <InAppBottomNav />
    </div>
  );
}

