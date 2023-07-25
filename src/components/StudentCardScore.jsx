import StudentSectionStudentCard from './StudentSectionStudentCard'

export default function StudentCardScore({filteredData, arrPhase, activePhase}) {
  return (
    <div style={{minHeight: '40em'}} className="flex justify-center">
      {filteredData?.map((phase, idx) => {
        if (phase.name === arrPhase[activePhase]) {
          return (
            <div key={idx} className={`${phase.name === arrPhase[activePhase] ? 'flex' : 'hidden'} w-full`}>
              <div className="w-full">
                <h2 className="text-2xl font-extrabold text-center uppercase">{phase.name}</h2>
                {phase?.scores?.map((score, scoreIdx) => {
                  return <StudentSectionStudentCard key={scoreIdx} scoreIdx={scoreIdx} phase={phase} score={score} />
                })}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}