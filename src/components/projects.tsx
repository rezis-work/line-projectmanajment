"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { ProjectAvatar } from "@/features/projects/components/project-avatar";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiAddCircleFill } from "react-icons/ri";

export function Projects() {
  const workspaceId = useWorkspaceId();
  const pathname = usePathname();
  const { open } = useCreateProjectModal();
  const { data: projects, isLoading } = useGetProjects({ workspaceId });

  if (isLoading) {
    return (
      <>
        <div className="flex items-center justify-center">
          <p className="text-xs uppercase text-neutral-500 mr-2">Workspaces</p>
          <RiAddCircleFill
            onClick={open}
            className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          />
        </div>
        <div>Loading...</div>;
      </>
    );
  }

  if (!projects) {
    return (
      <>
        <div className="flex items-center justify-center">
          <p className="text-xs uppercase text-neutral-500 mr-2">Workspaces</p>
          <RiAddCircleFill
            onClick={open}
            className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          />
        </div>
        <div>No projects found</div>;
      </>
    );
  }

  if (projects.documents.length === 0) {
    return (
      <>
        <div className="flex items-center justify-center">
          <p className="text-xs uppercase text-neutral-500 mr-2">Workspaces</p>
          <RiAddCircleFill
            onClick={open}
            className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          />
        </div>
        <div>No projects found</div>
      </>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className="text-xs uppercase text-neutral-500 mr-2">Workspaces</p>
        <RiAddCircleFill
          onClick={open}
          className="size-5 text-neutral-500 cursor-pointer hover:opacity-75 transition"
        />
      </div>
      {projects.documents.map((project) => {
        const href = `/workspace/${workspaceId}/project/${project.$id}`;
        const isActive = pathname === href;

        return (
          <Link href={href} key={project.$id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md hover:opacity-75 transition cursor-pointer text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar image={project.imageUrl} name={project.name} />
              <span className="truncate">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
