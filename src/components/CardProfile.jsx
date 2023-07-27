import {
  HiOutlineMapPin,
  HiOutlineMagnifyingGlass,
  HiOutlineEnvelope,
  HiOutlineBriefcase,
  HiOutlineBell,
  HiOutlineFaceSmile,
  HiOutlineFaceFrown,
  HiCalendarDays,
} from 'react-icons/hi2';
import { GiChessKnight } from 'react-icons/gi';
import { MdFlag } from 'react-icons/md';
import SeeMore from './SeeMore';
import { formatDate } from '../helper/dayjs';

export default function CardProfile({ detail }) {
  return (
    <div className="w-full rounded-lg shadow mb-5 p-10 bg-white flex flex-wrap md:flex-nowrap">
      <div className="flex flex-col gap-3 md:w-1/3">
        <h2 className="font-bold">About</h2>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <HiOutlineMagnifyingGlass />
              Background
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3">{detail?.profile.background}</span>
        </div>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <HiOutlineMapPin />
              Location
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3">{detail?.profile.location}</span>
        </div>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <HiOutlineEnvelope />
              Email
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3 break-words">{detail?.profile.email}</span>
        </div>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <GiChessKnight />
              P-{detail?.batches[detail?.batches.length - 1].phase} Batch
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3">{detail?.batches[detail?.batches.length - 1].name}</span>
        </div>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <HiCalendarDays />
              P-{detail?.batches[detail?.batches.length - 1].phase} Start Date
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3">
            {formatDate(detail?.batches[detail?.batches.length - 1].startDate)}
          </span>
        </div>
        <div className="flex text-xs">
          <div className="w-1/3 flex flex-wrap">
            <span className="opacity-70 flex items-start gap-1">
              <MdFlag />
              P-{detail?.batches[detail?.batches.length - 1].phase} End Date
            </span>
          </div>
          <span className="w-2/3 font-bold pl-3">
            {formatDate(detail?.batches[detail?.batches.length - 1].endDate)}
          </span>
        </div>
      </div>
      <div className="divider md:divider-horizontal w-full"></div>
      <div className="md:w-1/3">
        <h2 className="font-bold">Factor</h2>
        <div className="mt-3 text-xs">
          <h3 className="font-bold">
            <div className="text-x flex gap-2 justify-score">
              <HiOutlineFaceSmile />
              Support
            </div>
          </h3>
          <SeeMore text={detail?.profile.supportingFactor} />
        </div>
        <div className="mt-2 text-xs mb-3">
          <h3 className="font-bold">
            <div className="text-x flex gap-2 justify-score">
              <HiOutlineFaceFrown />
              Obstacle
            </div>
          </h3>
          <SeeMore text={detail?.profile.obstacleFactor} />
        </div>
      </div>
      <div className="divider md:divider-horizontal w-full"></div>
      <div className="md:w-1/3">
        <h2 className="font-bold">Goals</h2>
        <div className="mt-2 text-xs mb-3">
          <h3 className="font-bold flex">
            <div className="text-x flex gap-2 justify-score">
              <HiOutlineBriefcase />
              Reason
            </div>
          </h3>
          <SeeMore text={detail?.profile.reason} />
        </div>
        <div className="mt-2 text-xs">
          <h3 className="font-bold flex">
            <div className="text-x flex gap-2 justify-score">
              <HiOutlineBell />
              Objective
            </div>
          </h3>
          <SeeMore text={detail?.profile.objective} />
        </div>
      </div>
    </div>
  );
}
