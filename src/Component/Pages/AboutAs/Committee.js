import React, { useEffect, useRef, useState } from 'react';
import member from '../../../assets/member.png';
import President from '../../../assets/president.png';

const roles = [
  { title: 'President', name: 'Mr. XYZ Patel', img: President, details: 'President details here...' },
  { title: 'Vice-President', name: 'Mr. XYZ Patel', img: President, details: 'Vice-President details here...' },
  { title: 'Secretary', name: 'Mr. XYZ Patel', img: President, details: 'Secretary details here...' },
  { title: 'Treasurer', name: 'Mr. XYZ Patel', img: member, details: 'Treasurer details here...' },
];

const members = [
  { title: 'Member', name: 'Mr. XYZabc Patel', img: member, details: 'Member details for Mr. XYZabc Patel...' },
  { title: 'Member', name: 'Ms. ABCxyz Sharma', img: member, details: 'Member details for Ms. ABCxyz Sharma...' },
  { title: 'Member', name: 'Mr. John Doe', img: member, details: 'Member details for Mr. John Doe...' },
  { title: 'Member', name: 'Ms. Jane Smith', img: member, details: 'Member details for Ms. Jane Smith...' },
  { title: 'Member', name: 'Mr. Alex Johnson', img: member, details: 'Member details for Mr. Alex Johnson...' },
  { title: 'Member', name: 'Ms. Emily Davis', img: member, details: 'Member details for Ms. Emily Davis...' },
  { title: 'Member', name: 'Mr. Michael Lee', img: member, details: 'Member details for Mr. Michael Lee...' },
  { title: 'Member', name: 'Ms. Sarah Brown', img: member, details: 'Member details for Ms. Sarah Brown...' },
];

const membersPerRole = 2;

export default function CommitteeTreeWithModal() {
  const containerRef = useRef(null);
  const presidentRef = useRef(null);

  const rolesRefs = useRef([]);
  const membersRefs = useRef([]);

  // Clear refs on every render to avoid duplicates
  rolesRefs.current = [];
  membersRefs.current = [];

  const [lines, setLines] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addRoleRef = (el) => {
    if (el && !rolesRefs.current.includes(el)) {
      rolesRefs.current.push(el);
    }
  };

  const addMemberRef = (el) => {
    if (el && !membersRefs.current.includes(el)) {
      membersRefs.current.push(el);
    }
  };

  // Calculate connector lines between nodes
  useEffect(() => {
    function calculateLines() {
      if (!presidentRef.current || rolesRefs.current.length === 0 || membersRefs.current.length === 0)
        return;

      const containerRect = containerRef.current.getBoundingClientRect();

      // President → Roles
      const presidentRect = presidentRef.current.getBoundingClientRect();
      const presidentCenterX = presidentRect.left + presidentRect.width / 2 - containerRect.left;
      const presidentBottomY = presidentRect.bottom - containerRect.top;

      const presidentToRoles = rolesRefs.current.map((roleEl) => {
        const roleRect = roleEl.getBoundingClientRect();
        const roleCenterX = roleRect.left + roleRect.width / 2 - containerRect.left;
        const roleTopY = roleRect.top - containerRect.top;
        const controlPoint1 = { x: presidentCenterX, y: (presidentBottomY + roleTopY) / 2 };
        const controlPoint2 = { x: roleCenterX, y: (presidentBottomY + roleTopY) / 2 };
        return {
          startX: presidentCenterX,
          startY: presidentBottomY,
          endX: roleCenterX,
          endY: roleTopY,
          controlPoint1,
          controlPoint2,
          group: 'presidentToRoles',
        };
      });

      // Roles → Members
      const rolesToMembers = [];
      rolesRefs.current.forEach((roleEl, i) => {
        const roleRect = roleEl.getBoundingClientRect();
        const roleCenterX = roleRect.left + roleRect.width / 2 - containerRect.left;
        const roleBottomY = roleRect.bottom - containerRect.top;

        const startIdx = i * membersPerRole;
        const assignedMembers = membersRefs.current.slice(startIdx, startIdx + membersPerRole);

        assignedMembers.forEach((memberEl) => {
          if (!memberEl) return;
          const memberRect = memberEl.getBoundingClientRect();
          const memberCenterX = memberRect.left + memberRect.width / 2 - containerRect.left;
          const memberTopY = memberRect.top - containerRect.top;
          const controlPoint1 = { x: roleCenterX, y: (roleBottomY + memberTopY) / 2 };
          const controlPoint2 = { x: memberCenterX, y: (roleBottomY + memberTopY) / 2 };
          rolesToMembers.push({
            startX: roleCenterX,
            startY: roleBottomY,
            endX: memberCenterX,
            endY: memberTopY,
            controlPoint1,
            controlPoint2,
            group: `roleToMember-${i}`,
          });
        });
      });

      setLines([...presidentToRoles, ...rolesToMembers]);
    }

    calculateLines();
    window.addEventListener('resize', calculateLines);
    return () => window.removeEventListener('resize', calculateLines);
  }, []);

  // Handle clicking a card to open modal with details
  function handleCardClick(index) {
    let data = null;
    if (index < roles.length) {
      data = roles[index];
    } else {
      data = members[index - roles.length];
    }
    setModalData(data);
    setModalVisible(true);
  }

  // Close modal and clear data after animation
  function closeModal() {
    setModalVisible(false);
    setTimeout(() => setModalData(null), 300);
  }

  // Close modal on ESC key
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape' && modalVisible) {
        closeModal();
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalVisible]);

  // Determine if a line should be highlighted based on hovered card
  function isLineHighlighted(index, hoveredIdx) {
    if (hoveredIdx === null) return false;

    // Highlight president → role lines when president is hovered
    if (hoveredIdx === 0) {
      return index < roles.length - 1;
    }

    // Highlight role line and their member lines on role hover
    if (hoveredIdx > 0 && hoveredIdx < roles.length) {
      if (index === hoveredIdx - 1) return true;

      const roleIndex = hoveredIdx - 1;
      const rolesToMembersStart = roles.length - 1;

      if (
        index >= rolesToMembersStart + roleIndex * membersPerRole &&
        index < rolesToMembersStart + (roleIndex + 1) * membersPerRole
      )
        return true;
    }

    // Highlight member's corresponding line when member hovered
    if (hoveredIdx >= roles.length) {
      const memberIndex = hoveredIdx - roles.length;
      const roleIndex = Math.floor(memberIndex / membersPerRole);

      const rolesToMembersStart = roles.length - 1;
      const lineIndex = rolesToMembersStart + roleIndex * membersPerRole + (memberIndex % membersPerRole);

      return index === lineIndex;
    }

    return false;
  }

  return (
    <section
      ref={containerRef}
      id="tree-container"
      className="py-10 px-4 max-w-7xl mx-auto relative "
      style={{ minHeight: '700px' }}
    >
        <h2 className="text-3xl font-extrabold mb-12 text-center tracking-tight text-gray-800">
         Our Committee
        </h2>

      {/* SVG connectors */}
      <svg
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, overflow: 'visible' }}
      >
        {lines.map(({ startX, startY, endX, endY, controlPoint1, controlPoint2 }, i) => (
          <AnimatedPath
            key={i}
            d={`M${startX},${startY} C${controlPoint1.x},${controlPoint1.y} ${controlPoint2.x},${controlPoint2.y} ${endX},${endY}`}
            highlighted={isLineHighlighted(i, hoveredIndex)}
          />
        ))}
      </svg>

      {/* President */}
      <div
        className="flex justify-center mb-20 relative"
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <NodeCard
          ref={presidentRef}
          {...roles[0]}
          isHovered={hoveredIndex === 0}
          onClick={() => handleCardClick(0)}
        />
      </div>

      {/* Roles except president */}
      <div className="flex justify-center flex-wrap gap-x-10 gap-y-8 mb-20 max-w-5xl mx-auto relative">
        {roles.slice(1).map((role, i) => {
          const idx = i + 1;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(idx)}
              style={{ cursor: 'pointer', position: 'relative' }}
              aria-label={`${role.title} card`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(idx);
              }}
            >
              <NodeCard ref={addRoleRef} {...role} isHovered={hoveredIndex === idx} />
            </div>
          );
        })}
      </div>

      {/* Members grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto relative">
        {members.map((member, i) => {
          const idx = i + roles.length;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(idx)}
              style={{ cursor: 'pointer', position: 'relative' }}
              aria-label={`${member.title} card`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') handleCardClick(idx);
              }}
            >
              <NodeCard ref={addMemberRef} {...member} isHovered={hoveredIndex === idx} />
            </div>
          );
        })}
      </div>

      {/* Modal for details */}
      <Modal visible={modalVisible} onClose={closeModal} ariaLabel="Committee member details">
        {modalData && (
          <div className="p-6">
            <button
              onClick={closeModal}
              className="float-right text-gray-500 hover:text-yellow-500 focus:outline-none"
              aria-label="Close details modal"
            >
              &times;
            </button>
            <div className="text-center">
              <img
                src={modalData.img}
                alt={modalData.title}
                className="w-28 h-28 rounded-full mx-auto mb-4"
              />
                <h3 className="text-xl font-bold mb-2 text-gray-800">{modalData.title}</h3>
                <p className="text-sm text-gray-700">{modalData.name}</p>
                <p className="text-sm text-gray-600 mt-4 whitespace-pre-line leading-relaxed">
                {modalData.details}
                </p>

            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

// Card for each node
const NodeCard = React.forwardRef(({ img, title, name, isHovered }, ref) => (
  <div
    ref={ref}
    className={`text-center p-4 rounded-lg shadow-md w-36 mx-auto transition-transform duration-200
      bg-white bg-opacity-50
      backdrop-filter backdrop-blur-md
      border border-white border-opacity-30
      ${isHovered ? 'scale-105 shadow-yellow-400 border-yellow-400 bg-opacity-30' : ''}
    `}
    style={{
      // fallback for browsers that don't support backdrop-filter
      WebkitBackdropFilter: 'blur(10px)',
      backdropFilter: 'blur(2px)',
      // smooth edges on semi-transparent backgrounds
      boxShadow: isHovered
        ? '0 8px 32px 0 rgba(251, 191, 36, 0.4)'
        : '0 4px 12px 0 rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
    }}
  >
    <img src={img} alt={title} className="w-20 h-20 mx-auto rounded-full mb-3" />
    <div className="font-semibold text-base text-gray-900">{title}</div>
    <div className="text-sm text-gray-700">{name}</div>


  </div>
));

// Animated SVG path for connectors
function AnimatedPath({ d, highlighted }) {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    path.style.transition = 'stroke-dashoffset 1.2s ease-out';
    requestAnimationFrame(() => {
      path.style.strokeDashoffset = '0';
    });
  }, [d]);

  return (
    <path
      ref={pathRef}
      d={d}
      fill="none"
      stroke={highlighted ? '#fbbf24' : '#cbd5e1'}
      strokeWidth={highlighted ? 3 : 1.5}
      style={{ transition: 'stroke 0.3s, strokeWidth 0.3s' }}
    />
  );
}

// Modal component with focus management and close on outside click
function Modal({ visible, onClose, children, ariaLabel }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (visible && modalRef.current) {
      const closeBtn = modalRef.current.querySelector('button');
      closeBtn?.focus();
    }
  }, [visible]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto relative"
        tabIndex={-1}
      >
        {children}
      </div>
    </div>
  );
}
