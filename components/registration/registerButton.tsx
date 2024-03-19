import { ElementType } from "react"
import { NextComponentType } from "next"
import clsx from "clsx"

type RegisterButtonProps = {
  title: string
  icon: ElementType
  iconSize?: number
  description?: string
  classNames?: string
  onClick?: () => void
}
const RegisterButton: NextComponentType<{}, {}, RegisterButtonProps> = ({
  icon: Icon,
  title,
  classNames,
  description,
  iconSize,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "flex w-64 h-56 group/item  hover:scale-105 transition-all duration-300 flex-col items-center justify-between gap-1 p-6 border rounded-xl border-muted shadow-md hover:shadow-xl cursor-pointer",
        classNames
      )}
    >
      <Icon
        size={iconSize ? iconSize : 72}
        className="text-white group-hover/item:scale-110 group-hover/item:text-teal-500 transition-all duration-500"
      />
      <div className="flex  flex-col gap-1 items-center text-center place-content-center">
        <p className="text-2xl group-hover/item:text-teal-500 transition-all duration-500 font-bold text-white">
          {title}
        </p>
        {description && (
          <p className="text-zinc-500 text-sm group-hover/item:text-white transition-all duration-500">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default RegisterButton
