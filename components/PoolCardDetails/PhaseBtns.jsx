import styles from '../../styles/Launchpad.module.css';

export default function PhaseBtns({ phase, setPhaseId, active }) {
  return (
    <button
      id={phase?.id}
      className={`${active ? styles.active : ``} ${styles.phaseBtns}`}
      onClick={() => {
        setPhaseId(phase?.id);
      }}
    >
      {phase?.title}
    </button>
  );
}
